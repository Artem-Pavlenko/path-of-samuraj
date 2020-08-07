import {createStore, combineReducers} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

export type ReduxState = ReturnType<typeof reducers>

const store = createStore(reducers)

export type ReduxStore = typeof store


export default store