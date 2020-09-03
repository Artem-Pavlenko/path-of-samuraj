import React from "react";
import {UsersReducerType} from "../../../redux/usersReducer";


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