import React from "react";
import {User} from "../../../redux/usersReducer";
import s from "./UserItem.module.css"

type UserItemType = {
    user: User
    // onFollow: (userId: string) => void
    // onUnFollow: (userId: string) => void
    // keyId: string
    unFollow: (userID: string) => void
    follow: (userID: string) => void
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
                    <img src={user.user.photoURL} className={s.avatar}/>
                </div>
                <div>
                    {user.user.followed
                        ? <button onClick={unFollow}>unFollow</button>
                        : <button onClick={follow}>Follow</button>}

                </div>
            </span>
            <span>
                <span>
                    <div>{user.user.fullName}</div>
                    <div>{user.user.status}</div>
                </span>
                <span>
                    <div>{user.user.live.country}</div>
                    <div>{user.user.live.cities}</div>
                </span>
            </span>
        </div>
    )
}

export default UserItem;