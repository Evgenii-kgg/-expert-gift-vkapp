import React, {useEffect, useState} from 'react';
import {useStore} from 'app/context/store';
import {observer} from 'mobx-react-lite';
import Slider from "react-slick";

import * as S from './style';
import Header from "app/core/components/Header";
import {GiftStoreType, GiftType} from "app/stores/GiftStore";
import {GiftItem} from "app/containers/ListGift/components/gift_item";
import {API} from "app/core/services/api";
import {customAlert} from "app/core/components/alert";
import {GiftMenu} from "app/containers/ListGift/components/gift_menu";
import {vk_bridge} from "app/core/services/vk_bridge";
import {StageStoreType} from "app/stores/StageStore";
import {isMobile} from "app/core/helpers/detect_mobile";

import { toJS } from 'mobx';

const ListGift = observer(function (props) {
    const store = useStore();
    const giftStore: GiftStoreType = store.giftStore;
    const stageStore: StageStoreType = store.stageStore;

    const [mark, toggleMark] = useState<0 | 1>();
    const [currentGift, toggleGift] = useState<GiftType>(giftStore.gifts[0]);
    const [loadAttachGifts, setLoadAttachGifts] = useState<boolean>(false);

    let slider: any = null;

    let settings = {
        dots: false,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: "progressive",
        swipe: false,
        centerMode: true,
        infinite: false,
        arrows: false,
        // fade: true,
        beforeChange: (current: number, next: number) => {
            if (mark === undefined) return;
            saveMark(giftStore.gifts[current], mark);
            toggleGift(giftStore.gifts[next]);
            giftStore.setCurrentGiftIndex(next);
            if (giftStore.gifts.length < current + 5 && !loadAttachGifts) {
                attachGifts();
            }
        },
    };

    if (isMobile) {
        //settings slider for mobile
        settings = Object.assign(settings, {centerPadding: '10px'});
    }

    const addScoreRepost = async (gift: GiftType) => {
        const response = await API.post<number>("repost", gift);
        if (response.status) {
            stageStore.setScore(response.data);
        } else {
            customAlert.danger('Не удалось добавить очки за репост!');
        }
    };

    const setMark = async (mark: 0 | 1) => {
        toggleMark(mark);
        slider.slickNext();
    };

    const repost = async () => {
        const response = await vk_bridge.send("VKWebAppShowWallPostBox", {"message": `Эксперт подарков! Идея: ${currentGift?.title || ''}! https://vk.com/siberia_handmade`});
        if (response.status) {
            addScoreRepost(currentGift);
        }
    };

    useEffect(() => {
        slider.slickGoTo(giftStore.currentGiftIndex);
        return () => {

        };
    }, []);

    const saveMark = async (gift: GiftType, mark: 0 | 1) => {
        const markData = {id: gift.id, mark: mark};
        const response = await API.post<number>('/save_marks', [markData]);
        if (response.status) {
            stageStore.setScore(response.data);
            //up level
            if (stageStore.nextStageScore <= response.data) {
                const next = stageStore.listStages.find(stage => stage.id === stageStore.stage.id + 1);
                next && stageStore.setStage({...next, score: response.data});
                stageStore.toggleModalStage(true);
            }
        } else {
            customAlert.danger('Не удалось сохранить оценки!');
        }
    };

    const attachGifts = async () => {
        setLoadAttachGifts(true);
        const response = await API.get<GiftType[]>('/gifts_new');
        if (response.status) {
            giftStore.attachGifts(response.data);
        } else {
            customAlert.danger('Не удалось загрузить список подарков!');
        }
        setLoadAttachGifts(false);
    };

  /*   console.log(1,toJS(giftStore.gifts) );
    console.log(2, currentGift); */
    

    const list_gift = giftStore.gifts.map((gift) => {
        
        return <GiftItem key={gift.id}
                         gift={gift}/>;
    });


    return (
        <S.Container>
            {/* <Header screen={ScreenEnum.ListGift} setScreen={screenStore.setScreen}/> */}
            <S.Main>
                <S.Title>{currentGift?.title || ''}</S.Title>
                <S.SliderContainer>
                    {/*
                    // @ts-ignore */}
                    <Slider ref={c => (slider = c)} {...settings}>
                        {list_gift}
                    </Slider>
                </S.SliderContainer>
                <GiftMenu setMark={setMark} repost={repost} />
            </S.Main>
        </S.Container>
    );
});

export default ListGift;
