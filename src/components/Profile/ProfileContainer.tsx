import React from "react";
import axios from "axios";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setToggleFetchProfile, setUserProfile, UserProfileType} from "../../redux/profileReducer";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import { withRouter } from "react-router-dom";
import {RouteComponentProps} from "react-router";


type RouterType = RouteComponentProps<{ userID: string }>
type DispatchProfileType = {
    setUserProfile: (profile: UserProfileType) => void
    setToggleFetchProfile: (isFetch: boolean) => void
}
type StateProfileType = {
    profile: UserProfileType
    isFetch: boolean
}
type ProfilePropsType = DispatchProfileType & StateProfileType & RouterType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) {   //если не передаём никой id профиля, то хададим по умолчанию id
            userID = '2' //здесь мы передаём ID как строку, но приходят как integer(целое число).В URL всё строки(string)
        }
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + userID)
            .then((response) => {
                this.props.setToggleFetchProfile(false)
                this.props.setUserProfile(response.data)
            })
    }

    render () {
        return (
            <div>
                <Profile profile={this.props.profile} isFetch={this.props.isFetch}/>
            </div>
        )
    }
}


let WithURLDataContainerComponent = withRouter(ProfileContainer)

let mapStateToProps = (state: ReduxStateType): StateProfileType => {
    return {
        profile: state.profilePage.profile,
        isFetch: state.profilePage.isFetching
    }
}
let mapDispatchToProps = (dispatch: DispatchType): DispatchProfileType => {
    return {
        setUserProfile:  (profile: UserProfileType) => {
            dispatch(setUserProfile(profile))
        },
        setToggleFetchProfile: (isFetch: boolean) => {
            dispatch(setToggleFetchProfile(isFetch))
        }
        //короткий вариант
        // setUserProfile,
        //setToggleFetchProfile
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(WithURLDataContainerComponent);