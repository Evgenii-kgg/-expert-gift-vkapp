import React from 'react';
import * as S from './../style';
import {StageModel} from "app/stores/StageStore";
import { access } from 'fs';

interface Props {
    list_stages: StageModel[]
    score: number
}

type IColumnElem  = JSX.Element[]

export const ListStages: React.FC<Props> = (props) => {

    // if (acc.score < props.score >= currentStage.score ) {
        //          return acc.col1.push(<S.Text bold color={'red'} key={currentStage.id}>{currentStage.name}</S.Text>)
        //      } else {
        //          acc.col1.push(<S.Text bold color={'black'} key={currentStage.id}>{currentStage.name}</S.Text>)
        //     }

    const list = props.list_stages.reduce((acc:{col1:IColumnElem,col2:IColumnElem, score:number}, currentStage) => {
        
        let between = ((acc.score < props.score) && (props.score < currentStage.score)) ? 'green' : 'black'
        acc.col1.push(<S.Text bold color={between} key={currentStage.id}>{currentStage.name}</S.Text>)
        

        //acc.col1.push(<S.Text bold color={'red'} key={currentStage.id}>{currentStage.name}</S.Text>);
        acc.col2.push(<S.Text bold color={between}  key={currentStage.id}>  
            <span>{acc.score}</span> - <span>{currentStage.score}</span>
        </S.Text>);
         console.log(acc.score);
         console.log(currentStage.score);
        acc.score = currentStage.score
       
        return acc;
    }, {col1: [], col2: [], score:0});

    return <S.Wrap>
        <S.Col>
            <S.Text bottom={10}>Уровни</S.Text>
            {list.col1}
        </S.Col>
        <S.Col>
            <S.Text bottom={10}>Баллы</S.Text>
            {list.col2}
        </S.Col>
    </S.Wrap>;
};

