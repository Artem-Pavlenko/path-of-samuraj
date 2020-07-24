import {v1} from "uuid";

export type DialogsDataType = {
    id: string
    name: string
}
export type MessageDataType = {
    id: string
    message: string
}
export type CommentType = {
    comm: string
    like: number
    id: string
}
export type ProfileType = {
    post: Array<CommentType>
    newText: string
}
export type DialogsPageType = {
    dialog: Array<DialogsDataType>
    mess: Array<MessageDataType>
}
export type StateType = {
    dialogsPageType: DialogsPageType
    profilePost: ProfileType
}
export type StoreType = {
    _state: StateType
    _onChange: () => void //_rerenderTree
    addPost: (postMessage: string) => void
    changeNewText: (newText: string) => void
    subscriber: (callback: () => void) => void
    getState: () => StateType
}

let store: StoreType = {
    _state: {
        dialogsPageType: {
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
            ]
        },
        profilePost: {
            post: [
                {id: v1(), comm: "It's my first post", like: 5},
                {id: v1(), comm: "Hello World!", like: 7},
                {id: v1(), comm: "React it's cool!", like: 25}
            ],
            newText: ""
        }
    },
    _onChange() { //_rerenderTree
        console.log("a")
    },
    getState() {
        return this._state
    },
    addPost(postMessage: string) {
        let newPost: CommentType = {
            id: v1(), comm: postMessage, like: 0
        }
        this._state.profilePost.post.unshift(newPost)
        this._onChange()
        console.log(this._state.profilePost.post)
        this._state.profilePost.newText = ""
    },
    changeNewText(newText: string) {
        this._state.profilePost.newText = newText
        this._onChange()
    },

    subscriber(callback) { //наблюдатель observer-props который fn ()=>void
        this._onChange = callback
    }
}

export default store;