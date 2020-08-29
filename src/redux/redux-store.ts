import {createStore, combineReducers} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer, { Users } from "./usersReducer";

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
export type FollowUser = {
    type: "FOLLOW"
    userID: number
}
export type UnfollowUser = {
    type: "UNFOLLOW"
    userID: number
}
export type SetUsers = {
    type: "SET_USERS"
    items: Array<Users>
}
export type SetCurrentPage = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
export type SetTotalCount = {
    type: 'SET_TOTAL_COUNT'
    totalCount: number
}

export type ActionsTypes = AddPostActionType | ChangeNewTextActionType |
    ChangeNewMessActionType | AddMessActionType | FollowUser |
    UnfollowUser | SetUsers | SetCurrentPage | SetTotalCount

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    userPage: usersReducer
})
const store = createStore(reducers)

export type ReduxStateType = ReturnType<typeof reducers>
export type ReduxStore = typeof store
export type DispatchType = typeof store.dispatch


export default store;