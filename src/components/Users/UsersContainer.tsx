import {connect} from "react-redux";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unFollowAC, Users} from "../../redux/usersReducer";
import Userses from "./Users";


let mapStateToProps = (state: ReduxStateType) => {
    return {
        users: state.userPage.items,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID))
        },
        unFollow: (userID: number) => {
            dispatch(unFollowAC(userID))
        },
        setUsers: (users: Array<Users>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Userses)

export default UsersContainer