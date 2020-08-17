import {createStore, combineReducers} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";


export type AddPostActionType = {
    type: "ADD-POST"
    // postMessage: string
}
export type ChangeNewTextActionType = {
    type: "CHANGE-NEW-TEXT"
    newText: string
}
export type ChangeNewMessActionType = {
    type: "CHANGE-NEW-MESS-TEXT"
    newMessText: string
}
export type AddMessActionType = {
    type: "ADD-MESS"
    //mess: string
}
export type ActionsTypes = AddPostActionType | ChangeNewTextActionType |
    ChangeNewMessActionType | AddMessActionType

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})
export type ReduxState = ReturnType<typeof reducers>


const store = createStore(reducers)
export type ReduxStore = typeof store
export type DispatchType = typeof store.dispatch

export default store
