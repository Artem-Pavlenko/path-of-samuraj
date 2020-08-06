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
    newMessText: string
}
export type StateType = {
    dialogsPageType: DialogsPageType
    profilePost: ProfileType
}
export type StoreType = {
    _state: StateType
    _onChange: () => void //_rerenderTree
    // addPost: (postMessage: string) => void
    // changeNewText: (newText: string) => void
    subscriber: (callback: () => void) => void
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
export type ActionsTypes = AddPostActionType | ChangeNewTextActionType | ChangeNewMessActionType | AddMessActionType

export const addPostActionCreator = (): AddPostActionType => ({
    type: "ADD-POST" //, postMessage: postText
})
export const changeNewTexActionCreator = (newText: string): ChangeNewTextActionType => ({
    type: "CHANGE-NEW-TEXT", newText: newText
})
export const addMessActionCreator = (): AddMessActionType => ({
    type: "ADD-MESS" //, mess: messText
})
export const changeMessActionCreator = (newMessText: string): ChangeNewMessActionType => ({
    type: "CHANGE-NEW-MESS-TEXT", newMessText: newMessText
})


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
            ],
            newMessText: ""
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
    _onChange() {    //_rerenderTree
        console.log("a")
    },
    getState() {
        return this._state
    },

    // добавление поста и change без dispatch
    // addPost(postMessage: string) {
    //     let newPost: CommentType = {
    //         id: v1(), comm: postMessage, like: 0
    //     }
    //     this._state.profilePost.post.unshift(newPost)
    //     this._onChange()
    //     console.log(this._state.profilePost.post)
    //     this._state.profilePost.newText = ""
    // },
    // changeNewText(newText: string) {
    //     this._state.profilePost.newText = newText
    //     this._onChange()
    // },

    dispatch(action) {
        if (action.type === "ADD-POST") {
            // let newPost: CommentType = {
            //     id: v1(), comm: action.postMessage, like: 0
            // }
            // this._state.profilePost.post.unshift(newPost)
            //ниже рефактор (без доп.пропрса в dispatch AddPostActionType)

            let postValue = this._state.profilePost.newText
            this._state.profilePost.post.unshift({
                id: v1(), comm: postValue, like: 0
            })

            this._onChange()
            console.log(this._state.profilePost.post)
            this._state.profilePost.newText = ""

        } else if (action.type === "CHANGE-NEW-TEXT") {
            this._state.profilePost.newText = action.newText
            this._onChange()

        } else if (action.type === "CHANGE-NEW-MESS-TEXT") {
            debugger
            this._state.dialogsPageType.newMessText = action.newMessText
            this._onChange()

        } else if (action.type === "ADD-MESS") {
            // let newMess: MessageDataType = {
            //     id: v1(), message: action.mess
            // }
            // this._state.dialogsPageType.mess.push(newMess)
            // рефактор

            let newMess2 = this._state.dialogsPageType.newMessText
            this._state.dialogsPageType.mess.push({id: v1(), message: newMess2})

            this._onChange()
            this._state.dialogsPageType.newMessText = ""
        }

    },

    subscriber(callback) { //наблюдатель observer-props который fn ()=>void
        this._onChange = callback
    }
}


export default store;