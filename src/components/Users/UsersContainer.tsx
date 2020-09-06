import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage, setFollowing,
    setToggleFetch,
    setTotalCount,
    setUsers,
    unFollow,
    UsersReducerType
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import {userAPI} from "../../API/API";

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
    followingInProgress: Array<number>
    setFollowing: (userID: number, isFetch: boolean) => void
}

class UsersPage extends React.Component<UsersCType> {

    componentDidMount() {
        this.props.setToggleFetch(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then((responseData) => {
            this.props.setToggleFetch(false)
            this.props.setUsers(responseData.items)
            this.props.setTotalCount(responseData.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setToggleFetch(true)
        this.props.setCurrentPage(pageNumber)
        userAPI.getUsers(pageNumber, this.props.pageSize).then((responseData) => {
            this.props.setToggleFetch(false)
            this.props.setUsers(responseData.items)
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
            followingInProgress={this.props.followingInProgress}
            setFollowing={this.props.setFollowing}
        />
    }
}


let mapStateToProps = (state: ReduxStateType) => {
    return {
        users: state.userPage.items,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        followingInProgress: state.userPage.followingInProgress.userID
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
let UsersContainer = connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setToggleFetch,
    setFollowing
})(UsersPage)

export default UsersContainer