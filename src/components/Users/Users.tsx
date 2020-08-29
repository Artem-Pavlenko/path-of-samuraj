import React from "react";
import s from './Users.module.css'
import {Users} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import axios from 'axios'
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<Users>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<Users>) => void
    setCurrentPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

class Userses extends React.Component<UsersType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
            })

    }

    render() {

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div className={s.pageNumber}>
                    {pages.map( p => {
                        return <span
                            onClick={() => {this.onPageChanged(p)}}
                            className={this.props.currentPage === p ? s.selectedPage : ''}>
                            { p }
                        </span>
                    })}
                </div>
                {this.props.users.map(user => {
                    let unFollow = () => {
                        this.props.unFollow(user.id)
                    }
                    let follow = () => {
                        this.props.follow(user.id)
                    }
                    return <UserItem
                        follow={follow}
                        unFollow={unFollow}
                        key={user.id}
                        user={user}
                    />
                })}
            </div>
        );
    }
}

export default Userses;