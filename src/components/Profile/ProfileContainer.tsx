import React from "react";
import Profile from "./Profile";
import {compose} from "redux"
import {connect} from "react-redux";
import {
    getProfileStatus, getProfileThunk, setToggleFetchProfile,
    setUserProfile, UserProfileType
} from "../../store/profileReducer";
import {StateType} from "../../store/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

type RouterType = RouteComponentProps<{ userID: string }>
type DispatchProfileType = {
    setUserProfile: (profile: UserProfileType) => void
    setToggleFetchProfile: (isFetch: boolean) => void
    getProfile: (profileIdFromURL: string) => void
    getProfileStatus: (userID: string) => void
}
type StateProfileType = {}
type ProfilePropsType = DispatchProfileType & StateProfileType & RouterType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        //переменной присваиваем ID который будет в URL при нажати на аватарку пользователя(в User.tsx)
        let userID = this.props.match.params.userID
        if (!userID) {   //если не передаём никой id профиля, то хададим по умолчанию id
            userID = '7546' //здесь мы передаём ID как строку, но приходят как integer(целое число).В URL всё строки(string)
        }
        //thunk
        this.props.getProfile(userID)
        this.props.getProfileStatus(userID)
    }

    render() {
        // if (!this.props.isAuth)return <Redirect to={'/Login'}/> // если пользователь не залогинен, то перенаправит на страницу Login
        return (
            <div>
                <Profile/>
            </div>
        )
    }
}

let mapStateToProps = (state: StateType): StateProfileType => {
    return {
        profile: state.profile.profile,
        isFetch: state.profile.isFetching
    }
}

// let mapDispatchToProps = (dispatch: DispatchType): DispatchProfileType => {
//     return {
//         setUserProfile:  (profile: UserProfileType) => {
//             dispatch(setUserProfile(profile))
//         },
//         setToggleFetchProfile: (isFetch: boolean) => {
//             dispatch(setToggleFetchProfile(isFetch))
//         }
//         //короткий вариант
//         // setUserProfile,
//         //setToggleFetchProfile
//     }
// }

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// //закидываем ProfileContainer в hoc, чтоб внутри компоненты был доступ к url
// let WithURLDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {
//     setUserProfile,
//     setToggleFetchProfile,
//     getProfile: getProfileThunk
// })(WithURLDataContainerComponent);

export default compose<React.ComponentType>(connect(mapStateToProps, {
    setUserProfile,
    setToggleFetchProfile,
    getProfile: getProfileThunk,
    getProfileStatus
}), withRouter)(ProfileContainer)

//as React.ComponentClass