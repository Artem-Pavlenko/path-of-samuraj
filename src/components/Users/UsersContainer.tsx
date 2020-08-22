import {connect} from "react-redux";
import Users from "./Users";
import {DispatchType, ReduxState} from "../../redux/redux-store";
import {followAC, setUsersAC, unFollowAC, User} from "../../redux/usersReducer";

let mapStateToProps = (state: ReduxState) =>{
    return {
        users: state.userPage.users
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        follow: (userID: string)=> {
            dispatch(followAC(userID))
        },
        unFollow: (userID: string)=> {
            dispatch(unFollowAC(userID))
        },
        setUsers: (users: Array<User>) => {
            dispatch(setUsersAC(users))
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer