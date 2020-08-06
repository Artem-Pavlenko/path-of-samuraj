import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {ActionsTypes, CommentType} from "../../../redux/state";
import {addPostActionCreator, changeNewTexActionCreator} from "../../../redux/profileReducer";

type MyPostPropsType = {
    dataPost: Array<CommentType>
    textAreaValue: string
    //addPost: (newMess: string) => void
    //updatePostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}

function MyPosts(props: MyPostPropsType) {
    let postElement = props.dataPost.map(post => <Post comment={post.comm} likeCount={post.like}/>)

    function addPost() {
        //props.addPost(props.textAreaValue)
        // ниже рефактор
        // props.dispatch(addPostActionCreator(props.textAreaValue))
        // ниже еще рефактор
        props.dispatch(addPostActionCreator())
    }

    function onPostChang(e: ChangeEvent<HTMLTextAreaElement>) {
        //props.updatePostText(e.currentTarget.value)
        props.dispatch(changeNewTexActionCreator(e.currentTarget.value))
    }

    function onEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.charCode === 13) {
            addPost()
        }
    }

    return (
        <div className={s.myPost}>
            <h3> My posts </h3>
            <div>
                <textarea
                    onKeyPress={onEnter}
                    className={s.text}
                    value={props.textAreaValue}
                    onChange={onPostChang}
                    placeholder={"enter a comment"}
                />
                <div>
                    <br/>
                    <button className={s.btn} onClick={addPost}>Add post</button>
                </div>
            </div>
            {postElement}
        </div>
    )
}

export default MyPosts;