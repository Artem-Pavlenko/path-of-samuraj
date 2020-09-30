import React from "react";
import {UsersReducerType} from "../../../store/usersReducer";

type UserItemType = {
    user: UsersReducerType
    unFollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}

function UserItem(props: UserItemType) {
    function unFollow() {
        props.unFollow(props.user.id)
    }

    function follow() {
        props.follow(props.user.id)
    }

    return (
        <div key={props.user.id}>
            <span>
                <div>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={unFollow}>unFollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={follow}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                <span>
                    <div>{'country'}</div>
                    <div>{'cities'}</div>
                </span>
            </span>
        </div>
    )
}

export default UserItem;