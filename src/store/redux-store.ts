import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer";


const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    user: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer

})




let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export type StateType = ReturnType<typeof reducers>
export type ReduxStore = typeof store
export type DispatchType = typeof store.dispatch

export default store;

// @ts-ignore
window._store_ = store