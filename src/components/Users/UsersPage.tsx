import {connect} from "react-redux";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage,
    setToggleFetch,
    setTotalCount,
    setUsers,
    unFollow,
    UsersReducerType
} from "../../redux/usersReducer";
import React from "react";
import axios from 'axios'
import Users from "./Users";


type UsersCType = {
    users: Array<UsersReducerType>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersReducerType>) => void
    setCurrentPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    setToggleFetch: (fetch: boolean) => void
}

class UsersC extends React.Component<UsersCType> {

    componentDidMount() {
        this.props.setToggleFetch(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setToggleFetch(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (page: number) => {
        this.props.setToggleFetch(true)
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setToggleFetch(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            users={this.props.users}
            isFetching={this.props.isFetching}
        />
    }
}


let mapStateToProps = (state: ReduxStateType) => {
    return {
        users: state.userPage.items,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching
    }
}
// let mapDispatchToProps = (dispatch: DispatchType) => {
//     return {
//         follow: (userID: number) => {
//             dispatch(follow(userID))
//         },
//         unFollow: (userID: number) => {
//             dispatch(unFollow(userID))
//         },
//         setUsers: (users: Array<UsersReducerType>) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (page: number) => {
//             dispatch(setCurrentPage(page))
//         },
//         setTotalCount: (totalCount: number) => {
//             dispatch(setTotalCount(totalCount))
//         },
//         onFetch: (f: boolean) => {
//             dispatch(setToggleFetch(f))
//         }
//     }
// }


let UsersPage = connect(mapStateToProps,{
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setToggleFetch
} )(UsersC)

export default UsersPage