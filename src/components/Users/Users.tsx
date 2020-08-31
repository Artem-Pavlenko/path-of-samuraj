import React from "react";
import {UsersReducerType} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import s from "./Users.module.css";
import Preloader from "../../common/Preloader/Preloader";


type UsersItemPageType = {
    users: Array<UsersReducerType>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (page: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
}

function Users(props: UsersItemPageType) {

    let pageCount = Math.ceil((props.totalUsersCount / props.pageSize) / 100) //делю на 100 чтобы отображалось меньше страниц
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <div>
                <div className={s.pageNumber}>
                    {pages.map(p => {
                        return <span
                            onClick={() => {
                                props.onPageChanged(p)
                            }}
                            className={props.currentPage === p ? s.selectedPage : ''}>
                            {p}
                        </span>
                    })}
                    {props.isFetching ? <Preloader/> : null}
                </div>
                {props.users.map(user => {
                    let unFollow = () => {
                        props.unFollow(user.id)
                    }
                    let follow = () => {
                        props.follow(user.id)
                    }
                    return <UserItem
                        follow={follow}
                        unFollow={unFollow}
                        key={user.id}
                        user={user}
                        userAvatar={user.photos.small}
                    />
                })}
            </div>
        </>
    )
}


export default Users;