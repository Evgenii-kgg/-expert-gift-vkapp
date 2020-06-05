import React from 'react';
import { Router, Link, useHistory } from 'react-router-dom';
//import {ScreenEnum} from "app/stores/ScreenStore";
import * as S from './style';
import { useStore } from 'app/context/store';
import { observer } from 'mobx-react-lite';
import { GiftStoreType } from 'app/stores/GiftStore';

export const ButtonStart: React.FC = observer(() => {
  // const screenStore = useStore().screenStore;
  const giftStore: GiftStoreType = useStore().giftStore;

  const disabled = giftStore.gifts.length === 0;
  let history = useHistory();

  function watchGifts() {
    if (disabled) return;
    history.push('/ListGift');
  }

  return (
    <S.Button disabled={disabled} onClick={watchGifts}>
      Поехали
    </S.Button>
  );
});
