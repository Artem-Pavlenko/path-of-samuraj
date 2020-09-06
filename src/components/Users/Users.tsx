import React from "react";
import { UsersReducerType} from "../../redux/usersReducer";
import UserItem from "./userItem/UserItem";
import s from "./Users.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../assets/images/user img/images_man.png'
import {followingAPI} from "../../API/API";

type UsersItemPageType = {
    users: Array<UsersReducerType>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (page: number) => void
    setFollowing: (usrID: number, isFetch: boolean) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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
                            key={p}
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
                        // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                        //     withCredentials: true,
                        //     headers: {
                        //         'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
                        //     }
                        // })
                        props.setFollowing(user.id, true)
                        followingAPI.unFollowing(user.id)
                            .then((responseResultCode) => {
                                if (responseResultCode === 0) {
                                    props.unFollow(user.id)
                                }
                                props.setFollowing(user.id,false)
                            })
                    }
                    let follow = () => {
                        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                        //     withCredentials: true,
                        //     headers: {
                        //         'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
                        //     }
                        // })
                        props.setFollowing(user.id, true)
                        followingAPI.following(user.id)
                            .then((response) => {
                                if (response === 0) {
                                    props.follow(user.id)
                                }
                                props.setFollowing(user.id, false)
                            })
                    }
//При нажатии(NavLink) на аватарку пользователя в URL попадёт его ID.
                    return <div key={user.id}>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                key={user.id}
                                className={s.avatarIMG}
                                src={user.photos.small == null
                                    ? userIcon
                                    : user.photos.small} alt="..."
                            />
                        </NavLink>
                        <UserItem
                            key={user.id}
                            follow={follow}
                            unFollow={unFollow}
                            user={user}
                            userAvatar={user.photos.small}
                            followingInProgress={props.followingInProgress}
                        />
                    </div>
                })}
            </div>
        </>
    )
}


export default Users;