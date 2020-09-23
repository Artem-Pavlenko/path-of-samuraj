import {createStore, combineReducers, applyMiddleware} from "redux"
import profileReducer, {
    AddPostActionType, addStatusTextType, setProfileStatusType,
    setToggleFetchProfile, setUserProfileType
} from "./profileReducer";
import dialogsReducer, {AddMessActionType} from "./dialogsReducer";
import usersReducer, {
    FollowUser, SetCurrentPage, setFollowingType, SetTotalCount,
    SetUsers, ToggleFetchingType, UnfollowUser
} from "./usersReducer";
import authReducer, {setAuthorizationType, setPhotoType, setToggleFetchHeaderType} from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'


export type ActionsTypes = AddPostActionType | AddMessActionType | FollowUser |
    UnfollowUser | SetUsers | SetCurrentPage | SetTotalCount |
    ToggleFetchingType | setUserProfileType | setToggleFetchProfile |
    setAuthorizationType | setToggleFetchHeaderType | setPhotoType | setFollowingType |
    addStatusTextType | setProfileStatusType

const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    user: usersReducer,
    auth: authReducer,
    form: formReducer
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export type ReduxStateType = ReturnType<typeof reducers>
export type ReduxStore = typeof store
export type DispatchType = typeof store.dispatch

export default store;

// @ts-ignore
window.store = store