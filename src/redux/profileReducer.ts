import {ActionsTypes, AddPostActionType, ChangeNewTextActionType, ProfileType} from "./store";
import {v1} from "uuid";

const ADD_POST = "ADD-POST"
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"

export const addPostActionCreator = (): AddPostActionType => ({
    type: "ADD-POST" //, postMessage: postText
})
export const changeNewTexActionCreator = (newText: string): ChangeNewTextActionType => ({
    type: "CHANGE-NEW-TEXT", newText: newText
})

let initialState: ProfileType = {
    post: [
        {id: v1(), comm: "It's my first post", like: 5},
        {id: v1(), comm: "Hello World!", like: 7},
        {id: v1(), comm: "React it's cool!", like: 25}
    ],
    newText: ""
}

const profileReducer = (state: ProfileType = initialState, action: ActionsTypes): ProfileType => {
    switch (action.type) {
        case ADD_POST:
            let postValue = state.newText
            state.post.unshift({
                id: v1(), comm: postValue, like: 0
            })
            state.newText = ""
            return {...state}
        case CHANGE_NEW_TEXT:
            state.newText = action.newText
            return {...state}
        default:
            return state
    }
}

export default profileReducer;