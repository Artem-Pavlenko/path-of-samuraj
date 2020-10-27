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
type StateProfileType = {
    userID: number | null
    isAuth: boolean
}
type ProfilePropsType = DispatchProfileType & StateProfileType & RouterType

class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile = () => {
        let userID = this.props.match.params.userID
        if (!userID) {//если не передаём никой id профиля, то хададим по умолчанию id
            userID = this.props.userID ? this.props.userID.toString() : '' //здесь мы передаём ID как строку, но приходят как integer(целое число).В URL всё строки(string)
        }
        //'thunk'
        this.props.getProfile(userID)
        this.props.getProfileStatus(userID)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.isAuth !== this.props.isAuth || prevProps.match.params.userID !== this.props.match.params.userID) {
            this.refreshProfile()
        }
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
        // ID авторизованоего пользоваетля
        userID: state.auth.data.id,
        isAuth: state.auth.isAuth
    }
}


export default compose<React.ComponentType>(connect(mapStateToProps, {
    setUserProfile,
    setToggleFetchProfile,
    getProfile: getProfileThunk,
    getProfileStatus
}), withRouter)(ProfileContainer)

//as React.ComponentClass