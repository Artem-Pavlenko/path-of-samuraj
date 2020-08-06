import React from "react";
import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes} from "../../redux/store";

type CommentType = {
    comm: string
    like: number
    id: string
}
type ProfileType = {
    post: Array<CommentType>
    //addPost: (postMess: string) => void
    dispatch: (action: ActionsTypes) => void
    textForTextAreaValue: string
    // updatePostText: (newText: string) => void
}



function Profile(props: ProfileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                dataPost={props.post}
                textAreaValue={props.textForTextAreaValue}
                dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;