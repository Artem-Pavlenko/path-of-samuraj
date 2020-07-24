import React from "react";
import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type CommentType = {
    comm: string
    like: number
    id: string
}
type ProfileType = {
    post: Array<CommentType>
    addPost: (postMess: string) => void
    textForTextAreaValue: string
    updatePostText: (newText: string) => void
}



function Profile(props: ProfileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                dataPost={props.post}
                addPost={props.addPost}
                updatePostText={props.updatePostText}
                textAreaValue={props.textForTextAreaValue}
            />
        </div>
    )
}

export default Profile;