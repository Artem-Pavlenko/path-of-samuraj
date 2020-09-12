import React from "react";
import Profile from "./Profile";
import {compose} from "redux"
import {connect} from "react-redux";
import {getProfileThunk, setToggleFetchProfile, setUserProfile, UserProfileType} from "../../store/profileReducer";
import {ReduxStateType} from "../../store/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

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
        //переменной присваиваем ID который будет в URL при нажати на аватарку пользователя(в User.tsx)
        let userID = this.props.match.params.userID
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
        // if (!this.props.isAuth)return <Redirect to={'/login'}/> // если пользователь не залогинен, то перенаправит на страницу Login
        return (
            <div>
                <Profile profile={this.props.profile} isFetch={this.props.isFetch}/>
            </div>
        )
    }
}


let mapStateToProps = (state: ReduxStateType): StateProfileType => {
    return {
        profile: state.profilePage.profile,
        isFetch: state.profilePage.isFetching
    }
}
let mapDispatchToProps = () =>{
    return {
        setUserProfile,
        setToggleFetchProfile,
        getProfile: getProfileThunk
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
//hoc который добавляет проверку на залогинен пользователь или нет
//закидываем в наш hoc, который добавить в компонент логику проверки на авторизацию пользователя

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
    getProfile: getProfileThunk
}), withRouter, withAuthRedirect)(ProfileContainer)

//as React.ComponentClass