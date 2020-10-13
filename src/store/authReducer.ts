import {DispatchType} from "./redux-store";
import {authAPI, profileAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

//типизация state/initialState
export type AuthType = {
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
    messages: Array<string> | []
    resultCode: number
    isAuth: boolean
    photo: string | null
    captchaURL: string | null
}
//типизация ActionCreators
type data = {
    data: {
        id: number
        login: string
        email: string
    }
    resultCode: number
    messages: string[]
}
export type setAuthorizationType = {
    type: typeof SET_AUTHORIZATION
    data: data
}
export type setToggleFetchHeaderType = {
    type: typeof SET_FETCH_HEADER
    isFetchHeader: boolean
}
export type setPhotoType = {
    type: typeof SET_PHOTO
    photo: string | null
}
export type setErrorMess = {
    type: typeof SET_ERROR_MESS
    messages: string
}
export type setCaptchaIMGType = {
    type: typeof SET_CAPTCHA_IMG
    captcha: string
}

//ActionsType
type ActionsType = setAuthorizationType | setToggleFetchHeaderType | setPhotoType
    | setErrorMess | setCaptchaIMGType

//case:
const SET_AUTHORIZATION = 'auth/SET_AUTHORIZATION'
const SET_FETCH_HEADER = 'auth/SET_TOGGLE_HEADER'
const SET_PHOTO = 'auth/SET_PHOTO'
const SET_ERROR_MESS = 'auth/SET_ERROR_MESS'
const SET_CAPTCHA_IMG = 'auth/SET_CAPTCHA_IMG'


let initialState: AuthType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: [],
    resultCode: 1,
    isAuth: false,
    photo: null,
    captchaURL: null
}


const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {

    switch (action.type) {
        case SET_AUTHORIZATION: {
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
            return {...state, captchaURL: action.captcha}
        }
        default:
            return state
    }
}

export default authReducer;

//ActionCreators
export const setAuthUserData = (data: data): setAuthorizationType => ({type: SET_AUTHORIZATION, data})
export const setToggleFetchAuth = (isFetchHeader: boolean): setToggleFetchHeaderType => ({
    type: SET_FETCH_HEADER,
    isFetchHeader
})
export const setPhoto = (photo: string | null): setPhotoType => ({type: SET_PHOTO, photo})
export const setErrorMess = (messages: string): setErrorMess => ({type: SET_ERROR_MESS, messages})
export const setCaptcha = (captcha: string): setCaptchaIMGType => ({type: SET_CAPTCHA_IMG, captcha})

//thunks
export const authMe = () => async (dispatch: DispatchType) => {
    try {
        const responseData = await authAPI.authMe()
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(setToggleFetchAuth(false)) // отрисовка 'Login' или имя залогиненого пользователя
            dispatch(setAuthUserData(responseData))

            let response = await profileAPI.getProfile(responseData.data.id) // дальше делаем запрос на сервак чтобы отрисовать фото
            dispatch(setPhoto(response.photos.small))
        } else if (responseData.resultCode !== ResultCodesEnum.Success) {
            alert(responseData.messages)
        }
    } catch (error) {
        console.log('ошибка (authMe)', error)
    }


}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.login(email, password, rememberMe)
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch<any>(authMe())
        } else if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {

            let responseIMG = await securityAPI.getCaptcha()
            dispatch(stopSubmit('login', {_error: response.messages[0]}))
            // dispatch(setErrorMess(response.messages[0]))
            dispatch(setCaptcha(responseIMG))
        } else if (response.resultCode !== ResultCodesEnum.Success) {
            console.log(response.messages)
            dispatch(stopSubmit('login', {_error: response.messages[0]}))
            // dispatch(setErrorMess(response.messages[0]))
        }
    } catch (error) {
        console.log('ошибка (login in authReducer)', error)
    }
}
export const logout = () => async (dispatch: DispatchType) => {
    try {
        const response = await authAPI.logout()
        if (response === ResultCodesEnum.Success) {
            dispatch(setToggleFetchAuth(false)) //зануляем state и авторизация = false
        }
    } catch (error) {
        console.log('ошибка (logout in authReducer)', error)
    }
}


