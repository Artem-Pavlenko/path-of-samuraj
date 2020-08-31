import React, {useMemo} from "react";
import {UsersReducerType} from "../../../redux/usersReducer";
import s from "./UserItem.module.css"
import userIconNam from "../../../assets/images/images_man.png";
import userIconFemen from "../../../assets/images/images.png";
import userIcon from "../../../assets/images/user.png";


// let randomIcon = [userIconNam, userIconFemen, userIcon]
// let icon = useMemo( () => {
//     return randomIcon[Math.floor(Math.random()*randomIcon.length)]
// }, [randomIcon])

type UserItemType = {
    user: UsersReducerType
    unFollow: (userID: number) => void
    follow: (userID: number) => void
    userAvatar: string | null
}

function UserItemBlock(user: UserItemType) {
    function unFollow() {
        user.unFollow(user.user.id)
    }
    function follow() {
        user.follow(user.user.id)
    }


    return (
        <div key={user.user.id}>
            <span>
                <div className={s.avatar}>
                     {<img src={user.userAvatar === null ? userIconNam : user.userAvatar} alt=""/>}
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

const UserItem = React.memo(UserItemBlock)
export default UserItem;