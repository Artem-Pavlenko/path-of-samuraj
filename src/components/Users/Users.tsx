import React from "react";
import {UsersReducerType} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import s from "./Users.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../assets/images/images_man.png'


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
                    {pages.map(p => {  //отрисовка к-во страниц пользователей/100(розделена на 100 для удобства просмотра)
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
                {props.users.map(user => {        //отрисовка пользователей
                    let unFollow = () => {
                        props.unFollow(user.id)
                    }
                    let follow = () => {
                        props.follow(user.id)
                    }

                    return <>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                className={s.avatarIMG}
                                src={user.photos.small == null
                                    ? userIcon
                                    : user.photos.small} alt="..."
                            />
                        </NavLink>
                        <UserItem
                            follow={follow}
                            unFollow={unFollow}
                            key={user.id}
                            user={user}
                            userAvatar={user.photos.small}
                        />
                    </>
                })}
            </div>
        </>
    )
}


export default Users;