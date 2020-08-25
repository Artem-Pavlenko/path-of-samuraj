import React from "react";
import { Users} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import  axios from 'axios'

type UsersType = {
    users: Array<Users>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<Users>) => void
}

function UsersFC(props: UsersType) {
    if (props.users.length === 0) {
        debugger
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then( (responce) => {
            debugger
            props.setUsers(responce.data.items)
        })
    }

    return (
        <div>
            {props.users.map(user => {
                function unFollow() {
                    props.unFollow(user.id)
                }
                function follow() {
                    props.follow(user.id)
                }
                return <UserItem
                    follow={follow}
                    unFollow={unFollow}
                    key={user.id}
                    user={user}
                />
            })}
        </div>
    )
}


export default UsersFC;