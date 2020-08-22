import {createStore, combineReducers} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer, { Users2} from "./usersReducer";

//типизация АС
export type AddPostActionType = {
    type: "ADD-POST"
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
export type FollowUserAC = {
    type: "FOLLOW"
    userID: number
}
export type UnfollowUserAC = {
    type: "UNFOLLOW"
    userID: number
}
export type SetUsersAc = {
    type: "SET_USERS"
    items: Array<Users2>
}
export type ActionsTypes = AddPostActionType | ChangeNewTextActionType |
    ChangeNewMessActionType | AddMessActionType | FollowUserAC |
    UnfollowUserAC | SetUsersAc

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    userPage: usersReducer
})
export type ReduxState = ReturnType<typeof reducers>


const store = createStore(reducers)
export type ReduxStore = typeof store
export type DispatchType = typeof store.dispatch

export default store
