import {ActionsTypes, DispatchType} from "./redux-store";
import {authAPI, profileAPI, securityAPI} from "../API/API";
import {stopSubmit} from "redux-form";

//типизация state/initialState
export type HeaderReducerType = {
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
    messages: Array<string> | []
    resultCode: 0 | 1
    isAuth: boolean
    photo: string | null
    img: string | null
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
export type setErrorMess = {
    type: 'SET_ERROR_MESS'
    messages: string
}
export type setCaptchaIMGType = {
    type: 'SET_CAPTCHA_IMG'
    captcha: string
}
//case:
const SET_AUTHORIZATION = "SET_AUTHORIZATION"
const SET_FETCH_HEADER = 'SET_TOGGLE_HEADER'
const SET_PHOTO = 'SET_PHOTO'
const SET_ERROR_MESS = 'SET_ERROR_MESS'
const SET_CAPTCHA_IMG = 'SET_CAPTCHA_IMG'
//ActionCreators
export const setAuthUserData = (data: HeaderReducerType): setAuthorizationType => ({type: SET_AUTHORIZATION, data})
export const setToggleFetchAuth = (isFetchHeader: boolean): setToggleFetchHeaderType => ({
    type: SET_FETCH_HEADER,
    isFetchHeader
})
export const setPhoto = (photo: string | null): setPhotoType => ({type: SET_PHOTO, photo})
export const setErrorMess = (messages: string): setErrorMess => ({type: SET_ERROR_MESS, messages})
export const setCaptcha = (captcha: string): setCaptchaIMGType => ({type: SET_CAPTCHA_IMG, captcha})
//thunks
export const authMe = () => (dispatch: DispatchType) => {
    authAPI.authMe()
        .then((responseData) => {
            if (responseData.resultCode === 0) {
                console.log('res data', responseData)
                dispatch(setToggleFetchAuth(false)) // отрисовка 'Login' или имя залогиненого пользователя
                dispatch(setAuthUserData(responseData))
                profileAPI.getProfile(responseData.data.id) // дальше делаем запрос на сервак чтобы отрисовать фото
                    .then((response) => {
                        dispatch(setPhoto(response.photos.small))
                    })
            } else if (responseData.resultCode !== 0) {
                alert(responseData.messages)
            }
        })
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: DispatchType) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch<any>(authMe())
            } else if (response.resultCode === 10) {
                securityAPI.getCaptcha()
                    .then(responseIMG => {
                        dispatch(stopSubmit('login', {_error: response.messages[0]}))
                        // dispatch(setErrorMess(response.messages[0]))
                        dispatch(setCaptcha(responseIMG))
                    })
            } else if (response.resultCode !== 0) {
                debugger
                console.log(response.messages)
                dispatch(stopSubmit('login', {_error: response.messages[0]}))
                // dispatch(setErrorMess(response.messages[0]))
            }
        })
}
export const logout = () => (dispatch: DispatchType) => {
    authAPI.logout()
        .then(response => {
            if (response === 0) {
                dispatch(setToggleFetchAuth(false)) //зануляем state и авторизация = false
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
    isAuth: false,
    photo: null,
    img: null
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
                ...state,
                // при выходе зануляем данные
                data: {email: null, login: null, id: null},
                messages: [],
                isAuth: action.isFetchHeader
            }
        }
        case SET_PHOTO: {
            return {
                ...state, photo: action.photo
            }
        }
        case SET_ERROR_MESS: {
            return {...state, messages: [action.messages]}
        }
        case SET_CAPTCHA_IMG: {
            return {...state, img: action.captcha}
        }
        default:
            return state
    }
}

export default authReducer;