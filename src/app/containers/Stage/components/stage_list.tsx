import React from "react";
import StageItem from "app/containers/Stage/components/stage_item";
import * as S from "./../style";
import {observer} from "mobx-react-lite";
import {IUser} from "app/stores/UsersStore";

interface IProps {
    users: IUser[];
}

export const StageList: React.FC<IProps> = observer((props) => {
    let list = props.users.sort((a,b)=> {return b.score-a.score})
    let userList = list.map((user, i) => <StageItem user={user} num={user.top || i + 1} />)
    
    
    return <S.List>
        {userList}
    </S.List>;
});

