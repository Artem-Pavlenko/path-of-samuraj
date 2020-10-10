import {connect} from "react-redux";
import {StateType} from "../../store/redux-store";
import {
    followThunk, getUsersThunk, setCurrentPage,
    unFollowThunk, UsersReducerType
} from "../../store/usersReducer";
import React from "react";
import Users from "./Users";
import {compose} from "redux"
import {
    getCurrentPageSelector, getFollowingInProgressUserIdSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUserCountSelector,
    getUsersSelector
} from "../../store/users-selectors";

type DispatchToPropsType = {
    setCurrentPage: (page: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    unFollowUser: (userID: number) => void
    followUser: (userId: number) => void
}
type StateToPropsType = {
    users: Array<UsersReducerType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type UsersContainerType = DispatchToPropsType & StateToPropsType

class UsersPage extends React.Component<UsersContainerType> {

    componentDidMount() {
        //thunk (преобразователь) сэтает из сервака юзеров при зазруке users страници
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {  //при нажатии номера страници пользователей
        this.props.setCurrentPage(pageNumber)
        //thunk
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <Users
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            users={this.props.users}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            unFollowUser={this.props.unFollowUser}
            followUser={this.props.followUser}
        />
    }
}


// let mapStateToProps = (state: StateType) => {
//     return {
//         users: state.user.items,
//         pageSize: state.user.pageSize,
//         totalUsersCount: state.user.totalUsersCount,
//         currentPage: state.user.currentPage,
//         isFetching: state.user.isFetching,
//         followingInProgress: state.user.followingInProgress.userID
//     }
// }

let mapStateToProps = (state: StateType) => {
    console.log('users container mapStateToProps')
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUserCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressUserIdSelector(state)
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setCurrentPage, getUsers: getUsersThunk, unFollowUser: unFollowThunk,
        followUser: followThunk
    }),
    // withAuthRedirect
)(UsersPage)