import React from "react";
import * as S from './style';
import {useStore} from "app/context/store";
import {RootStoreType} from "app/stores";
import {observer} from "mobx-react-lite";
import {StageStoreType} from "app/stores/StageStore";
import {vk_bridge} from "app/core/services/vk_bridge";



export const ModalStage: React.FC = observer((props) => {

    let wrap: any;

    const store: RootStoreType = useStore();


    const stageStore: StageStoreType = store.stageStore;

    const repost = async () => {
        const response = await vk_bridge.send("VKWebAppShowWallPostBox", {"message": `Эксперт подарков! Я достиг нового уровня ${stageStore.stage.score || ''}! https://vk.com/siberia_handmade`});
        /* if (response.status) {
            addScoreRepost(currentGift);
        } */
        console.log("всё работает");
    };

    const outSideClick = (e: any) => {
        if (!wrap.contains(e.target)) {
            stageStore.toggleModalStage(false);
        }
    };

    if (!stageStore.showModalStage) return null;

    return <S.Container onClick={outSideClick}>
        <S.Wrapper ref={(ref) => wrap = ref}>
            <S.Bg src={`${stageStore.stageImage}`}/>
            <S.Close onClick={() => stageStore.toggleModalStage(false)}/>
            <S.StageName>{stageStore.stage.name}</S.StageName>
            <S.Title>Поздравляем!</S.Title>
            <S.Text>Вы достигли нового ранга</S.Text>
            <S.Button onClick={() =>repost()}>Круто, рассказать друзьям!</S.Button>
        </S.Wrapper>
    </S.Container>;
});
