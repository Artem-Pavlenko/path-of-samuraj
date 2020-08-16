import {ActionsTypes, AddMessActionType, ChangeNewMessActionType, DialogsPageType} from "./store";
import {v1} from "uuid";

const ADD_MESS = "ADD-MESS"
const CHANGE_NEW_MESS_TEXT = "CHANGE-NEW-MESS-TEXT"

export const addMessActionCreator = (): AddMessActionType => ({
    type: "ADD-MESS" //, mess: messText
})
export const changeMessActionCreator = (newMessText: string): ChangeNewMessActionType => ({
    type: "CHANGE-NEW-MESS-TEXT", newMessText: newMessText
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
        case CHANGE_NEW_MESS_TEXT:
            state.newMessText = action.newMessText
            return {...state}
        case ADD_MESS:
            let newMess2 = state.newMessText
            state.mess.push({id: v1(), message: newMess2})
            state.newMessText = ""
            return {...state}
        default:
            return state
    }
}

export default dialogsReducer;