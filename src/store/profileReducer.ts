import {v1} from "uuid";
import {DispatchType} from "./redux-store";
import {profileAPI, ResultCodesEnum} from "../API/API";

//типизация initialState
export type CommentType = {
    comm: string
    like: number
    id: string
}
export type UserProfileType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: number,
    photos: {
        small: string | null,
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
    type: "ADD-POST"
    post: string
}
export type setUserProfileType = {
    type: 'SET_PROFILE'
    profile: UserProfileType
}
export type setToggleFetchProfile = {
    type: 'TOGGLE_FETCHING_PROFILE'
    isFetch: boolean
}
export type setProfileStatusType = {
    type: 'SET_PROFILE_STATUS'
    status: string
}
export type addStatusTextType = {
    type: 'ADD_STATUS_TEXT',
    status: string
}
type ActionsType = AddPostActionType | setUserProfileType | setToggleFetchProfile
    | setProfileStatusType | addStatusTextType
//CASE:
const ADD_POST = "ADD-POST"
const SET_PROFILE = "SET_PROFILE"
const TOGGLE_FETCHING_PROFILE = "TOGGLE_FETCHING_PROFILE"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"
const ADD_STATUS_TEXT = "ADD_STATUS_TEXT"


let initialState: ProfileType = {
    post: [
        {id: v1(), comm: "It's my first post", like: 5},
        {id: v1(), comm: "Hello World!", like: 7},
        {id: v1(), comm: "React it's cool!", like: 25}
    ],
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            youtube: null
        },
        fullName: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
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
                post: [
                    {id: v1(), comm: action.post, like: 0}, ...state.post]
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
        default:
            return state
    }
}

export default profileReducer;

// ActionCreators
export const addPostActionCreator = (post: string): AddPostActionType => ({
    type: "ADD-POST", post
})
export const setUserProfile = (profile: UserProfileType): setUserProfileType => ({type: SET_PROFILE, profile})
export const setToggleFetchProfile = (isFetch: boolean): setToggleFetchProfile => ({
    type: TOGGLE_FETCHING_PROFILE,
    isFetch
})
export const setProfileStatus = (status: string): setProfileStatusType => ({type: SET_PROFILE_STATUS, status})
export const addStatusText = (status: string): addStatusTextType => ({type: ADD_STATUS_TEXT, status})

//thunk
export const getProfileThunk = (userID: number) => (dispatch: DispatchType) => {
    profileAPI.getProfile(userID)
        .then((responseData) => {
            dispatch(setToggleFetchProfile(false))
            dispatch(setUserProfile(responseData))
        })
        .catch(error => {
            console.log('ошибка (getProfileThunk)', error)
        })
}
export const getProfileStatus = (userID: string) => (dispatch: DispatchType) => {
    profileAPI.getStatus(userID)
        .then(responseData => {
            dispatch(setProfileStatus(responseData))
        })
        .catch(error => {
            console.log('ошибка (getProfileStatus)', error)
        })

}
export const updateProfileStatus = (status: string) => (dispatch: DispatchType) => {
    profileAPI.updateStatus(status)
        .then(responseData => {
                if (responseData.resultCode === ResultCodesEnum.Success) {
                    dispatch(addStatusText(status))
                } else if (responseData.resultCode !== ResultCodesEnum.Success) {
                    alert(responseData.messages)
                }
            }
        )
        .catch(error => {
            console.log('ошибка (upbProfileStatus)', error)
        })
}