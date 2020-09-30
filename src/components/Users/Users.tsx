import React from "react";
import {UsersReducerType} from "../../store/usersReducer";
import UserItem from "./userItem/UserItem";
import s from "./Users.module.css";
import item from '../../common/layout/item.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../assets/images/user img/fsociety-mask-549635.png'


type DispatchToUsersPropsType = {
    onPageChanged: (page: number) => void
    unFollowUser: (userID: number) => void
    followUser: (userID: number) => void
}
type StateToUsersPropsType = {
    users: Array<UsersReducerType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type UsersItemPageType = DispatchToUsersPropsType & StateToUsersPropsType


function Users(props: UsersItemPageType) {

    let pageCount = Math.ceil((props.totalUsersCount / props.pageSize) / 50) //делю на 50 чтобы отображалось меньше страниц
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
            <div className={s.HeaderUserBlock}>
                <div className={s.pageNumber}>
                    {pages.map(p => {  //отрисовка к-во страниц пользователей/50(розделена на 50 для удобства просмотра)
                        return <span
                            key={p}
                            onClick={() => {
                                props.onPageChanged(p)
                            }}
                            className={props.currentPage === p ? s.selectedPage : ''}>
                            {p}
                        </span>
                    })}

                </div>
                <div className={s.PreloaderBlock}>
                    {props.isFetching && <Preloader/>}
                </div>
                {props.users.map(user => {        //отрисовка пользователей
                    let unFollow = () => {
                        //thunk
                        props.unFollowUser(user.id)
                    }
                    let follow = () => {
                        //thunk
                        props.followUser(user.id)
                    }
//При нажатии(NavLink) на аватарку пользователя в URL попадёт его ID.
                    return <div key={user.id} className={item.itemCase}>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                key={user.id}
                                className={s.avatarIMG}
                                src={user.photos.small === null
                                    ? userIcon
                                    : user.photos.small}
                                alt={''}
                            />
                        </NavLink>
                        <UserItem
                            key={user.id}
                            follow={follow}
                            unFollow={unFollow}
                            user={user}
                            followingInProgress={props.followingInProgress}
                        />
                    </div>
                })}
            </div>
    )
}


export default Users;