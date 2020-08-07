import React from "react";
import {addPostActionCreator, changeNewTexActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {ReduxStore} from "../../../redux/redux-store";

type MyPostPropsType = {
    store: ReduxStore
    // dataPost: Array<CommentType>
    // textAreaValue: string
    // dispatch: (action: ActionsTypes) => void
}

//обёртка над презентационный компонент, чтобы презентационная компонент осталась "чистой"
function MyPostsContainer(props: MyPostPropsType) {

    let state = props.store.getState()

    function addPost() {
        props.store.dispatch(addPostActionCreator())
    }
    function onPostChang(text: string) {
        props.store.dispatch(changeNewTexActionCreator(text))
    }

    return (
        <MyPosts
            dataPost={state.profilePage.post}
            textAreaValue={state.profilePage.newText}
            updatePostText={onPostChang}
            addPost={addPost}
        />
    )
}

export default MyPostsContainer;