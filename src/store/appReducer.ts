import {Dispatch} from "react";
import {DispatchType} from "./redux-store";
import {authMe} from "./authReducer";


type StateAppReducerType = {
    initialized: boolean
}
// Action types
type setInitialized = {
    type: 'SET_INITIALIZED'
}
type ActionsTypes = setInitialized
let initialState: StateAppReducerType = {
    initialized: false // приложение проинициалтзтровано или нет
}

const appReducer = (state: StateAppReducerType = initialState, action: ActionsTypes): StateAppReducerType => {
    switch (action.type) {
        case "SET_INITIALIZED": {
            return {...state, initialized: true}
        }
        default: return state
    }
}


//ActionCreators
export const setInitialize = (): setInitialized => ({type: "SET_INITIALIZED"})

//thunk
export const initializeApp = () => (dispatch: DispatchType) => {
    // если будет несколько асинхронных запросов и надо ПОСЛЕ выполнения ВСЕХ что-то сделать, то лучше закинуть все
    // промисы в Promise.all([]) (массив) и после уже в методе .then() выполнить что нужно
    // let promise = dispatch<any>(authMe())
    // Promise.all([promise]).then(()=>{
    //     dispatch(setInitialize)
    // })
    dispatch<any>(authMe())
        .then(()=>{
            dispatch(setInitialize())
            console.log('setInitialize')
        })
}


export default appReducer;