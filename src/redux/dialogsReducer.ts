import {ActionsTypes, DialogsPageType} from "./state";
import {v1} from "uuid";

const ADD_MESS = "ADD-MESS"
const CHANGE_NEW_MESS_TEXT = "CHANGE-NEW-MESS-TEXT"

const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case CHANGE_NEW_MESS_TEXT:
            state.newMessText = action.newMessText
            return state
        case ADD_MESS:
            let newMess2 = state.newMessText
            state.mess.push({id: v1(), message: newMess2})
            state.newMessText = ""
            return state
        default:
            return state
    }
}

export default dialogsReducer;