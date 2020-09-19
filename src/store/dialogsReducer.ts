import {v1} from "uuid";
import {ActionsTypes} from "./redux-store";

//типизация initialState
export type DialogsDataType = {
    id: string
    name: string
}
export type MessageDataType = {
    id: string
    message: string
}
export type DialogsPageType = {
    dialog: Array<DialogsDataType>
    mess: Array<MessageDataType>
    newMessText: string
}
//типизация ActionCreators
export type AddMessActionType = {
    type: "ADD-MESS"
    mess: string
}

//case:
const ADD_MESS = "ADD-MESS"
//ActionCreators

export const addMessActionCreator = (mess: string): AddMessActionType => ({
    type: "ADD-MESS" , mess
})

let initialState: DialogsPageType = {
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
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {

    switch (action.type) {
        case ADD_MESS:
            return {
                ...state,
                mess: [...state.mess,{id: v1(), message: action.mess}]
            }
        default:
            return state
    }
}

export default dialogsReducer;