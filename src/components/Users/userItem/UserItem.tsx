import React from "react";
import {UsersReducerType} from "../../../store/usersReducer";
import s from "../Users.module.scss";
import userIcon from "../../../assets/images/user img/fsociety-mask-549635.png";
import {NavLink} from "react-router-dom";

type UserItemType = {
    user: UsersReducerType
    unFollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}

function UserItem(props: UserItemType) {

    const unFollow = () => {
        props.unFollow(props.user.id)
    }

    const follow = () => {
        props.follow(props.user.id)
    }
//При нажатии(NavLink) на аватарку пользователя в URL попадёт его ID.
    return (
        <div key={props.user.id}>
            <NavLink to={'/profile/' + props.user.id}>
                <img className={s.avatarIMG}
                     src={props.user.photos.small === null
                         ? userIcon
                         : props.user.photos.small}
                     alt={''}
                />
            </NavLink>
            <span>
                <div>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={unFollow}>unFollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={follow}>Follow</button>}
                </div>
            </span>
            <div>{props.user.name}</div>
            <div>{props.user.status}</div>
            <div>{'country: '}</div>
            <div>{'cities: '}</div>
        </div>
    )
}

export default UserItem;