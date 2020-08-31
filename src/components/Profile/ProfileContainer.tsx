import React from "react";
import axios from "axios";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setToggleFetchProfile, setUserProfile, UserProfileType} from "../../redux/profileReducer";
import {ReduxStateType} from "../../redux/redux-store";

type ProfileContainerPage = {
    setUserProfile: (profile: UserProfileType) => void
    profile: UserProfileType
    isFetch: boolean
    setToggleFetchProfile: (isFetch: boolean) => void
}

class ProfilePage extends React.Component<ProfileContainerPage> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/2')
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

let mapStateToProps = (state: ReduxStateType) => {
    return {
        profile: state.profilePage.profile,
        isFetch: state.profilePage.isFetching
    }
}



let ProfileContainer =  connect(mapStateToProps, {setUserProfile, setToggleFetchProfile})(ProfilePage);
export default ProfileContainer