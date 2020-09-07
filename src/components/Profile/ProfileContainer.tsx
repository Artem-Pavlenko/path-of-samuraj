import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk, setToggleFetchProfile, setUserProfile, UserProfileType} from "../../redux/profileReducer";
import {ReduxStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

type RouterType = RouteComponentProps<{ userID: string }>
type DispatchProfileType = {
    setUserProfile: (profile: UserProfileType) => void
    setToggleFetchProfile: (isFetch: boolean) => void
    getProfile: (profileIdFromURL: string) => void

}
type StateProfileType = {
    profile: UserProfileType
    isFetch: boolean
}
type ProfilePropsType = DispatchProfileType & StateProfileType & RouterType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userID = this.props.match.params.userID   //переменной присваиваем ID который будет в URL при нажати на аватарку пользователя(в User.tsx)
        if (!userID) {   //если не передаём никой id профиля, то хададим по умолчанию id
            userID = '7546' //здесь мы передаём ID как строку, но приходят как integer(целое число).В URL всё строки(string)
        }
        //thunk
        this.props.getProfile(userID)
        // profileAPI.getProfile(+userID)
        //     .then((responseData) => {
        //         this.props.setToggleFetchProfile(false)
        //         this.props.setUserProfile(responseData)
        //     })
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile} isFetch={this.props.isFetch}/>
            </div>
        )
    }
}

//закидываем ProfileContainer в hoc, что передать
let WithURLDataContainerComponent = withRouter(ProfileContainer)

let mapStateToProps = (state: ReduxStateType): StateProfileType => {
    return {
        profile: state.profilePage.profile,
        isFetch: state.profilePage.isFetching
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

export default connect(mapStateToProps, {
    setUserProfile,
    setToggleFetchProfile,
    getProfile: getProfileThunk
})(WithURLDataContainerComponent);