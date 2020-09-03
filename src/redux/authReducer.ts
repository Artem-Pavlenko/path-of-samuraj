import {ActionsTypes} from "./redux-store";

//типизация state/initialState
export type AuthDataType ={
    data: {
        id: number | null,
        login: string | null,
        email: string | null
    },
    messages: [string] | [],
    resultCode: 0 | 1
}
export type HeaderReducerType = {
    data: {
        id: number | null,
        login: string | null,
        email: string | null
    },
    messages: [string] | [],
    resultCode: 0 | 1,
    isFetchHead: boolean
}

//типизация ActionCreators
export type setAuthorizationType = {
    type: "SET_AUTHORIZATION"
    data:  HeaderReducerType

}
export type setToggleFetchHeaderType = {
    type: 'SET_TOGGLE_HEADER'
    isFetchHeader: boolean
}
//case:
const SET_AUTHORIZATION = "SET_AUTHORIZATION"
const SET_FETCH_HEADER = 'SET_TOGGLE_HEADER'

//ActionCreators
export const setAuthUserData = (data: HeaderReducerType): setAuthorizationType => ({type: SET_AUTHORIZATION,data})
export const setToggleFetchAuth  = (isFetchHeader: boolean): setToggleFetchHeaderType => ({type: SET_FETCH_HEADER, isFetchHeader})

let initialState: HeaderReducerType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: [],
    resultCode: 1,
    isFetchHead: true
}


const authReducer = (state: HeaderReducerType  = initialState, action: ActionsTypes): HeaderReducerType  => {

    switch (action.type) {
        case SET_AUTHORIZATION: {
            console.log(action.data)
            //придумать что-то перед ответом из сервака ! ! !
            console.log(state.isFetchHead)
            return  {
                ...state,
                ...action.data
            }
        }
        case SET_FETCH_HEADER: {
            return {
                ...state, isFetchHead: action.isFetchHeader
            }
        }
        default:
            return state
    }
}

export default authReducer;