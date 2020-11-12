import React from "react";
import {UsersReducerType} from "../../store/usersReducer";
import UserItem from "./userItem/UserItem";
import s from "./Users.module.scss";
import item from '../../common/layout/item.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import Paginator from "../../common/Paginator/Paginator";
import Preloader2 from "../../common/Preloader/PreloaderWithStyle/Preloader2";


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
    portionSize: number
    isAuth: boolean
}
type UsersItemPageType = DispatchToUsersPropsType & StateToUsersPropsType


const Users = ({onPageChanged, totalUsersCount, pageSize, currentPage, ...props}: UsersItemPageType) => {

    return (
        <div>
            <Paginator
                portionSize={props.portionSize}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
            />
            <div className={s.PreloaderBlock}>
                {props.isFetching && <Preloader2/>}
            </div>
            {props.users.map(user => {        //отрисовка пользователей
                let unFollow = () => {
                    props.unFollowUser(user.id)
                }
                let follow = () => {
                    props.followUser(user.id)
                }

                return <div key={user.id} className={item.itemCase}>
                    <UserItem
                        isAuth={props.isAuth}
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