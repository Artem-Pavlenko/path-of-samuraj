import {connect} from "react-redux";
import UsersFC from "./UsersFC";
import {DispatchType, ReduxState} from "../../redux/redux-store";
import {followAC, setUsersAC, unFollowAC, Users} from "../../redux/usersReducer";
import Users from "./Users";

let mapStateToProps = (state: ReduxState) => {
    return {
        users: state.userPage.items
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
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer