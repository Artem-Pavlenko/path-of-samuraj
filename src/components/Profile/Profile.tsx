import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import {ReduxStore} from "../../redux/redux-store";

type CommentType = {
    comm: string
    like: number
    id: string
}
type ProfileType = {
    // post: Array<CommentType>
    // dispatch: (action: ActionsTypes) => void
    // textForTextAreaValue: string
    store: ReduxStore
}

function Profile(props: ProfileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;