import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {CommentType, ProfileType} from "../../../redux/store";

type MyPostPropsType = {
    addPost: () => void
    updatePostText: (newText: string) => void
    profilePage: ProfileType
}

function MyPosts(props: MyPostPropsType) {
    let dataPost = props.profilePage.post
    let textAreaValue = props.profilePage.newText
    //отмапил посты
    let postElement = dataPost.map(post => <Post comment={post.comm} likeCount={post.like} key={post.id}/>)

    function onAddPost() {
        props.addPost()
    }
    function onPostChang(e: ChangeEvent<HTMLTextAreaElement>) {
        props.updatePostText(e.currentTarget.value)
    }

    function onEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.charCode === 13) {
            onAddPost()
        }
    }

    return (
        <div className={s.myPost}>
            <h3> My posts </h3>
            <div>
                <textarea
                    onKeyPress={onEnter}
                    className={s.text}
                    value={textAreaValue}
                    onChange={onPostChang}
                    placeholder={"enter a comment"}
                />
                <div>
                    <br/>
                    <button className={s.btn} onClick={onAddPost}>Add post</button>
                </div>
            </div>
            {/*посты*/}
            {postElement}
        </div>
    )
}

export default MyPosts;