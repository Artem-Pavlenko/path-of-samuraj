import React from "react";
import {compose} from "redux"
import {connect} from "react-redux";
import {getProfileStatus, getProfileThunk} from "../../store/profileReducer";
import {StateType} from "../../store/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";



type RouterType = RouteComponentProps<{ userID: string }>
type DispatchProfileType = {
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
        if (!userID) {              //если не передаём никакой id профиля
            userID = this.props.userID ? this.props.userID.toString() : ''
        }
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
                <ProfileInfo />
                <MyPostsContainer/>
            </div>
        )
    }
}

let mapStateToProps = (state: StateType): StateProfileType => {
    return {
        userID: state.auth.data.id,
        isAuth: state.auth.isAuth
    }
}


export default compose<React.ComponentType>(connect(mapStateToProps, {
    getProfile: getProfileThunk,
    getProfileStatus
}), withRouter)(ProfileContainer)

//as React.ComponentClass