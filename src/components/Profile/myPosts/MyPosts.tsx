import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import { CommentType } from "../../../redux/store";

type MyPostPropsType = {
    dataPost: Array<CommentType>
    textAreaValue: string
    addPost: () => void
    updatePostText: (newText: string) => void
}

function MyPosts(props: MyPostPropsType) {
    //отмапил посты
    let postElement = props.dataPost.map(post => <Post comment={post.comm} likeCount={post.like} key={post.id}/>)

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
                    value={props.textAreaValue}
                    onChange={onPostChang}
                    placeholder={"enter a comment"}
                />
                <div>
                    <br/>
                    <button className={s.btn} onClick={onAddPost}>Add post</button>
                </div>
            </div>
            {postElement}  {/*посты*/}
        </div>
    )
}

export default MyPosts;