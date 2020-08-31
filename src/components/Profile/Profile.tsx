import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import {UserProfileType} from "../../redux/profileReducer";

type profile = {
    profile: UserProfileType
    isFetch: boolean
}

function Profile(props: profile) {
    return (
        <div>
            <ProfileInfo profile={props.profile} isFetch={props.isFetch}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;