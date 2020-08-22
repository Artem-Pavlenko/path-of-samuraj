import React from "react";
import {Users2} from "../../../redux/usersReducer";
import s from "./UserItem.module.css"
import userIcon from '../../../assets/images/user.png'

type UserItemType = {
    user: Users2
    unFollow: (userID: number) => void
    follow: (userID: number) => void
}

function UserItem(user: UserItemType) {
    function unFollow() {
        user.unFollow(user.user.id)
    }
    function follow() {
        user.follow(user.user.id)
    }
    return (
        <div key={user.user.id}>
            <span>
                <div>
                    <img src={userIcon} className={s.avatar}/>
                </div>
                <div>
                    {user.user.followed
                        ? <button onClick={unFollow}>unFollow</button>
                        : <button onClick={follow}>Follow</button>}

                </div>
            </span>
            <span>
                <span>
                    <div>{user.user.name}</div>
                    <div>{user.user.status}</div>
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