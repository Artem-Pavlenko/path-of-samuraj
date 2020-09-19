import {ActionsTypes, DispatchType} from "./redux-store";
import {authAPI, profileAPI} from "../API/API";

//типизация state/initialState
// export type AuthDataType ={
//     data: {
//         id: number | null,
//         Login: string | null,
//         email: string | null
//     },
//     messages: [string] | [],
//     resultCode: 0 | 1
// }
export type HeaderReducerType = {
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
    messages: [string] | []
    resultCode: 0 | 1
    isFetchHead: boolean
    isAuth: boolean
    photo: string | null
}

//типизация ActionCreators
export type setAuthorizationType = {
    type: "SET_AUTHORIZATION"
    data: HeaderReducerType

}
export type setToggleFetchHeaderType = {
    type: 'SET_TOGGLE_HEADER'
    isFetchHeader: boolean
}
export type setPhotoType = {
    type: 'SET_PHOTO'
    photo: string | null
}
//case:
const SET_AUTHORIZATION = "SET_AUTHORIZATION"
const SET_FETCH_HEADER = 'SET_TOGGLE_HEADER'
const SET_PHOTO = 'SET_PHOTO'
//ActionCreators
export const setAuthUserData = (data: HeaderReducerType): setAuthorizationType => ({type: SET_AUTHORIZATION, data})
export const setToggleFetchAuth = (isFetchHeader: boolean): setToggleFetchHeaderType => ({
    type: SET_FETCH_HEADER,
    isFetchHeader
})
export const setPhoto = (photo: string | null): setPhotoType => ({type: SET_PHOTO, photo})
//thunk
export const authMe = () => (dispatch: DispatchType) => {
    authAPI.authMe()
        .then((responseData) => {
            if (responseData.resultCode === 0) {
                dispatch(setToggleFetchAuth(false)) // отрисовка 'Login' или имя залогиненого пользователя
                dispatch(setAuthUserData(responseData))
                profileAPI.getProfile(7546) // дальше делаем запрос на сервак чтобы отрисовать фото
                    .then((response) => {
                        dispatch(setPhoto(response.photos.small))
                    })
            } else if (responseData.resultCode !== 0) {
                alert(responseData.messages)
            }
        })
}


let initialState: HeaderReducerType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: [],
    resultCode: 1,
    isFetchHead: true,
    isAuth: false,
    photo: null
}


const authReducer = (state: HeaderReducerType = initialState, action: ActionsTypes): HeaderReducerType => {

    switch (action.type) {
        case SET_AUTHORIZATION: {
            //придумать что-то перед ответом из сервака ! ! !
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case SET_FETCH_HEADER: {
            return {
                ...state, isFetchHead: action.isFetchHeader
            }
        }
        case SET_PHOTO: {
            return {
                ...state, photo: action.photo
            }
        }
        default:
            return state
    }
}

export default authReducer;