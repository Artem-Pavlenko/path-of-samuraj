import {v1} from "uuid";
import {DispatchType, StateType} from "./redux-store";
import {EditProfile, profileAPI, ResultCodesEnum} from "../API/API";
import {Dispatch} from 'redux'
import {stopSubmit} from "redux-form";

//типизация initialState
export type CommentType = {
    comm: string
    like: number
    id: string
}
export type UserProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string | null
        large: string | null
    }
}
export type ProfileType = {
    post: Array<CommentType>
    profile: UserProfileType
    isFetching: boolean
    profileStatusText: string | null
    newStatusText: string | null
}
//типизация Action
export type AddPostActionType = {
    type: typeof ADD_POST
    post: string
}
export type setUserProfileType = {
    type: typeof SET_PROFILE
    profile: UserProfileType
}
export type setToggleFetchProfile = {
    type: typeof TOGGLE_FETCHING_PROFILE
    isFetch: boolean
}
export type setProfileStatusType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export type addStatusTextType = {
    type: typeof ADD_STATUS_TEXT,
    status: string
}
export type addPhotoType = {
    type: typeof ADD_PHOTO
    largePhoto: string
    smallPhoto: string
}
export type setProfileChangeType = {
    type: typeof SET_PROFILE_CHANGE
    profile: EditProfile
}
type ActionsType = AddPostActionType | setUserProfileType | setToggleFetchProfile
    | setProfileStatusType | addStatusTextType | addPhotoType
    | setProfileChangeType
//CASE:
const ADD_POST = "ADD_POST"
const SET_PROFILE = "SET_PROFILE"
const TOGGLE_FETCHING_PROFILE = "TOGGLE_FETCHING_PROFILE"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"
const ADD_STATUS_TEXT = "ADD_STATUS_TEXT"
const ADD_PHOTO = "ADD_PHOTO"
const SET_PROFILE_CHANGE = "SET_PROFILE_CHANGE"


let initialState: ProfileType = {
    post: [
        {id: v1(), comm: "It's my first post", like: 5},
        {id: v1(), comm: "Hello World!", like: 7},
        {id: v1(), comm: "React it's cool!", like: 25}
    ],
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            github: '',
            instagram: '',
            mainLink: '',
            twitter: '',
            vk: '',
            youtube: ''
        },
        fullName: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        userId: 0,
        photos: {
            large: null,
            small: null
        }
    },
    isFetching: true,
    profileStatusText: '',
    newStatusText: ''
}
//newStatusText не использу нигде, можно что-то придумать

const profileReducer = (state: ProfileType = initialState, action: ActionsType): ProfileType => {
    switch (action.type) {
        case ADD_POST:
            // if (action.post.trim()) {
            return {
                ...state,
                post: [{id: v1(), comm: action.post, like: 0}, ...state.post]
            }
        case SET_PROFILE:
            return {...state, profile: action.profile}
        case TOGGLE_FETCHING_PROFILE:
            return {...state, isFetching: action.isFetch}
        case SET_PROFILE_STATUS:
            return {
                ...state,
                profileStatusText: action.status,
                newStatusText: action.status
            }
        case ADD_STATUS_TEXT:
            return {...state, profileStatusText: action.status}
        case ADD_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        small: action.smallPhoto,
                        large: action.largePhoto
                    }
                }
            }
        case SET_PROFILE_CHANGE:
            return {
                ...state, profile: {...state.profile, ...action.profile}
            }
        default:
            return state
    }
}

export default profileReducer;

// ActionCreators
export const addPostActionCreator = (post: string): AddPostActionType => ({
    type: ADD_POST, post
})
export const setUserProfile = (profile: UserProfileType): setUserProfileType => ({type: SET_PROFILE, profile})
export const setToggleFetchProfile = (isFetch: boolean): setToggleFetchProfile => ({
    type: TOGGLE_FETCHING_PROFILE,
    isFetch
})
export const setProfileStatus = (status: string): setProfileStatusType => ({type: SET_PROFILE_STATUS, status})
export const addStatusText = (status: string): addStatusTextType => ({type: ADD_STATUS_TEXT, status})
export const addPhoto = (largePhoto: string, smallPhoto: string): addPhotoType => ({
    type: ADD_PHOTO,
    largePhoto,
    smallPhoto
})
export const setProfileChange = (profile: EditProfile): setProfileChangeType => ({type: SET_PROFILE_CHANGE, profile})

//thunk
export const getProfileThunk = (userID: number) => async (dispatch: DispatchType) => {
    try {
        const responseData = await profileAPI.getProfile(userID)
        dispatch(setToggleFetchProfile(false))
        dispatch(setUserProfile(responseData))
    } catch (error) {
        console.log('ошибка (getProfileThunk)', error.message)
    }
}

export const getProfileStatus = (userID: string) => async (dispatch: DispatchType) => {
    try {
        const responseData = await profileAPI.getStatus(userID)
        dispatch(setProfileStatus(responseData))
    } catch (error) {
        console.log('ошибка (getProfileStatus)', error.message)
    }
}

export const updateProfileStatus = (status: string) => async (dispatch: DispatchType) => {
    try {
        const responseData = await profileAPI.updateStatus(status)
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(addStatusText(status))
        } else if (responseData.resultCode !== ResultCodesEnum.Success) {
            alert(responseData.messages)
        }
    } catch (error) {
        console.log('ошибка (upbProfileStatus)', error.message)
    }
}

export const savePhoto = (photo: string | Blob) => async (dispatch: Dispatch) => {
    try {
        const responseData = await profileAPI.updPhotos(photo)
        console.log(responseData)
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(addPhoto(responseData.data.photos.large, responseData.data.photos.small))
        }
    } catch (e) {
        console.log('error in save photo: ', e.message)
    }
}

export const saveProfileChange = (profile: EditProfile) => async (dispatch: Dispatch, getState: () => StateType) => {
    try {
        const responseData = await profileAPI.saveProfileChange({...profile, userId: getState().profile.profile.userId})
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch<any>(getProfileThunk(getState().profile.profile.userId))
        } else if (responseData.resultCode !== ResultCodesEnum.Success) {
            console.log(responseData)
            dispatch(stopSubmit('editProfile', {_error: responseData.messages}))
            // возвращаем Промис чтобы
            return Promise.reject(responseData.messages)
        }
    } catch (e) {
        console.log('error in save edit profile: ', e.message)
    }
}