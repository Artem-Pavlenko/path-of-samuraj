import React from "react";
import {UsersReducerType} from "../../store/usersReducer";
import UserItem from "./userItem/UserItem";
import s from "./Users.module.css";
import item from '../../common/layout/item.module.css'
import Preloader from "../../common/Preloader/Preloader";
import Paginator from "../../common/Paginator/Paginator";


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


const Users = ({onPageChanged, totalUsersCount, pageSize, currentPage, ...props}: UsersItemPageType) => {

    return (
        <div>
            <Paginator
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
            />
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

                return <div key={user.id} className={item.itemCase}>
                    <UserItem
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