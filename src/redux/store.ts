import {v1} from "uuid";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

type DialogsDataType = {
    id: string
    name: string
}
type MessageDataType = {
    id: string
    message: string
}
type CommentType = {
    comm: string
    like: number
    id: string
}
type ProfileType = {
    post: Array<CommentType>
    newText: string
}
type DialogsPageType = {
    dialog: Array<DialogsDataType>
    mess: Array<MessageDataType>
    newMessText: string
}
type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfileType
}
type StoreType = {
    _state: StateType
    _onChange: () => void //_rerenderTree
    // addPost: (postMessage: string) => void
    // changeNewText: (newText: string) => void
    subscribe: (callback: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionsTypes) => void
}

type AddPostActionType = {
    type: "ADD-POST"
    // postMessage: string
}
type ChangeNewTextActionType = {
    type: "CHANGE-NEW-TEXT"
    newText: string
}
type ChangeNewMessActionType = {
    type: "CHANGE-NEW-MESS-TEXT"
    newMessText: string
}
type AddMessActionType = {
    type: "ADD-MESS"
    //mess: string
}
type ActionsTypes = AddPostActionType | ChangeNewTextActionType |
    ChangeNewMessActionType | AddMessActionType

let store: StoreType = {
    _state: {
        dialogsPage: {
            dialog: [
                {id: v1(), name: "Artem"},
                {id: v1(), name: "Dima"},
                {id: v1(), name: "Goga"},
                {id: v1(), name: "Alex"},
                {id: v1(), name: "Vlad"},
                {id: v1(), name: "Yarik"}
            ],
            mess: [
                {id: v1(), message: "Hello"},
                {id: v1(), message: "How are you ?"},
                {id: v1(), message: "What are you think about React?"},
                {id: v1(), message: "=)"},
                {id: v1(), message: "LOL"}
            ],
            newMessText: ""
        },
        profilePage: {
            post: [
                {id: v1(), comm: "It's my first post", like: 5},
                {id: v1(), comm: "Hello World!", like: 7},
                {id: v1(), comm: "React it's cool!", like: 25}
            ],
            newText: ""
        }
    },
    _onChange() {    //_rerenderTree
        console.log("a")
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._onChange()
    },

    subscribe(callback) { //наблюдатель observer-props который fn ()=>void
        this._onChange = callback
    }
}


export default store;