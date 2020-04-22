import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as S from './style';
import crown from '@img/crown.svg';
import gifts_list from '@img/gifts_list.svg';
import avatar from '@img/avatar.svg';
import { ScreenEnum } from 'app/stores/ScreenStore';
import { observer } from 'mobx-react-lite';
import { useStore } from 'app/context/store';
import { StageStoreType } from 'app/stores/StageStore';

interface Props {
  screen: ScreenEnum;
  setScreen: (screen: ScreenEnum) => void;
}

const Header: React.FC<Props> = observer((props) => {
  const stageStore: StageStoreType = useStore().stageStore;

  let history = useHistory();

  function handleClick1() {
    history.push('/ListGift');
  }
  function handleClick2() {
    history.push('/Stage');
  }
  function handleClick3() {
    history.push('/Profile');
  }

  return (
    <S.Container>
      <S.Info>
        <S.Stage>{stageStore.stage.name}</S.Stage>
        <S.Score>{stageStore.stage.score}</S.Score>
      </S.Info>
      <S.Tab
        //active={props.screen === ScreenEnum.ListGift}
        onClick={handleClick1}
      >
        <S.ImgGiftsList src={gifts_list} />
      </S.Tab>
      <S.Tab
        //active={props.screen === ScreenEnum.Stage}
        onClick={handleClick2}
      >
        <S.Img src={crown} />
      </S.Tab>
      <S.Tab
        //active={props.screen === ScreenEnum.Profile}
        onClick={handleClick3}
      >
        <S.Avatar src={avatar} />
      </S.Tab>
    </S.Container>
  );
});

export default Header;
