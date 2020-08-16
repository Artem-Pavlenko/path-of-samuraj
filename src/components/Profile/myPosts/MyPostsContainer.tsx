import React from "react";
import {addPostActionCreator, changeNewTexActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {DispatchType, ReduxState, ReduxStore} from "../../../redux/redux-store";
import {connect} from "react-redux";

// type MyPostPropsType = {
//     store: ReduxStore
//     // dataPost: Array<CommentType>
//     // textAreaValue: string
//     // dispatch: (action: ActionsTypes) => void
// }
//
// //обёртка над презентационный компонент, чтобы презентационная компонент осталась "чистой"
// function MyPostsContainer() {
//
//     let state = props.store.getState()
//
//     function addPost() {
//         props.store.dispatch(addPostActionCreator())
//     }
//     function onPostChang(text: string) {
//         props.store.dispatch(changeNewTexActionCreator(text))
//     }
//
//     return (
//         <MyPosts
//             profilePage={state.profilePage}
//             updatePostText={onPostChang}
//             addPost={addPost}
//         />
//     )
// }

let mapStateToProps = (state: ReduxState) =>{
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        addPost: ()=> dispatch(addPostActionCreator()),
        updatePostText: (text: string) =>  dispatch(changeNewTexActionCreator(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;