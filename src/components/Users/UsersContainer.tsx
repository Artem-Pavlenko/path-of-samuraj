import {connect} from "react-redux";
import {ReduxStateType} from "../../store/redux-store";
import {
    followThunk, getUsersThunk, setCurrentPage,
    unFollowThunk, UsersReducerType
} from "../../store/usersReducer";
import React from "react";
import Users from "./Users";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

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
        //thunk (преобразователь) сетает из сервака юзеров при зазруке users страници
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.setToggleFetch(true)
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize).then((responseData) => {
        //     this.props.setToggleFetch(false)
        //     this.props.setUsers(responseData.items)
        //     this.props.setTotalCount(responseData.totalCount)
        // })
    }

    onPageChanged = (pageNumber: number) => {  //принажатии номера страници пользователей
        this.props.setCurrentPage(pageNumber)
        //thunk (преобразователь)
        this.props.getUsers(pageNumber, this.props.pageSize)
        // this.props.setToggleFetch(true)
        // userAPI.getUsers(pageNumber, this.props.pageSize).then((responseData) => {
        //     this.props.setToggleFetch(false)
        //     this.props.setUsers(responseData.items)
        // })
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


let mapStateToProps = (state: ReduxStateType) => {
    return {
        users: state.user.items,
        pageSize: state.user.pageSize,
        totalUsersCount: state.user.totalUsersCount,
        currentPage: state.user.currentPage,
        isFetching: state.user.isFetching,
        followingInProgress: state.user.followingInProgress.userID
    }
}
// let authRedirectComponent = withAuthRedirect(UsersPage)

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
let UsersContainer = withAuthRedirect(connect(mapStateToProps, {
    setCurrentPage, getUsers: getUsersThunk,
    unFollowUser: unFollowThunk,
    followUser: followThunk
})(UsersPage))

export default UsersContainer