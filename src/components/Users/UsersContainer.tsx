import {connect} from "react-redux";
import Users from "./Users";
import {DispatchType, ReduxState} from "../../redux/redux-store";
import {followAC, setUsersAC, unFollowAC, Users2} from "../../redux/usersReducer";

let mapStateToProps = (state: ReduxState) =>{
    return {
        users: state.userPage.items
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        follow: (userID: number)=> {
            dispatch(followAC(userID))
        },
        unFollow: (userID: number)=> {
            dispatch(unFollowAC(userID))
        },
        setUsers: (users: Array<Users2>) => {
            dispatch(setUsersAC(users))
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer