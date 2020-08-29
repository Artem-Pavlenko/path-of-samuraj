
import {addPostActionCreator, changeNewTexActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {DispatchType, ReduxStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


let mapStateToProps = (state: ReduxStateType) =>{
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