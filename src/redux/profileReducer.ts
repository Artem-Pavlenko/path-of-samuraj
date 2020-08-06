import {ActionsTypes, ProfileType} from "./state";
import {v1} from "uuid";

const ADD_POST = "ADD-POST"
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"

const profileReducer = (state: ProfileType, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let postValue = state.newText
            state.post.unshift({
                id: v1(), comm: postValue, like: 0
            })
            state.newText = ""
            return state
        case CHANGE_NEW_TEXT:
            state.newText = action.newText
            return state
        default:
            return state
    }
}

export default profileReducer;