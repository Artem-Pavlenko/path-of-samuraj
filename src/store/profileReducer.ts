import {v1} from "uuid";
import {ActionsTypes, addStatusTextType, changeStatusTextType, DispatchType} from "./redux-store";
import {profileAPI} from "../API/API";

//типизация state/initialState
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
    newText: string
    profile: UserProfileType
    isFetching: boolean
    profileStatusText: string | null
    newStatusText: string | null

}
//типизация ActionCreators
type AddPostActionType = {
    type: "ADD-POST"
    // postMessage: string
}
type ChangeNewTextActionType = {
    type: "CHANGE-NEW-TEXT"
    newText: string
}
type setProfileType = {
    type: "SET_PROFILE"
    profile: UserProfileType
}
type ToggleFetchProfileType = {
    type: "TOGGLE_FETCHING_PROFILE"
    isFetch: boolean
}
//CASE:
const ADD_POST = "ADD-POST"
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"
const SET_PROFILE = "SET_PROFILE"
const TOGGLE_FETCHING_PROFILE = "TOGGLE_FETCHING_PROFILE"
const CHANGE_STATUS_TEXT = "CHANGE_STATUS_TEXT"
const ADD_STATUS_TEXT = "ADD_STATUS_TEXT"
// ActionCreators
export const addPostActionCreator = (): AddPostActionType => ({
    type: "ADD-POST"
})
export const changeNewTexActionCreator = (newText: string): ChangeNewTextActionType => ({
    type: "CHANGE-NEW-TEXT", newText: newText
})
export const setUserProfile = (profile: UserProfileType): setProfileType => ({type: SET_PROFILE, profile})
export const setToggleFetchProfile = (isFetch: boolean): ToggleFetchProfileType => ({
    type: TOGGLE_FETCHING_PROFILE,
    isFetch
})
export const changeStatusText = (newText: string): changeStatusTextType => ({type: CHANGE_STATUS_TEXT, newText})
export const addStatusText = (): addStatusTextType => ({type: ADD_STATUS_TEXT})

export const getProfileThunk = (userID: string) => {
    return (dispatch: DispatchType) => {
        profileAPI.getProfile(+userID)
            .then((responseData) => {
                dispatch(setToggleFetchProfile(false))
                dispatch(setUserProfile(responseData))
            })
    }
}


let initialState: ProfileType = {
    post: [
        {id: v1(), comm: "It's my first post", like: 5},
        {id: v1(), comm: "Hello World!", like: 7},
        {id: v1(), comm: "React it's cool!", like: 25}
    ],
    newText: "",
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
        userId: 1,
        photos: {
            large: null,
            small: null
        }
    },
    isFetching: true,
    profileStatusText: 'можно вАйти ?))',
    newStatusText: 'можно вАйти ?))'
}

const profileReducer = (state: ProfileType = initialState, action: ActionsTypes): ProfileType => {
    switch (action.type) {
        case CHANGE_NEW_TEXT:
            return {...state, newText: action.newText}
        case ADD_POST:
            if (state.newText.trim()) {
                return {
                    ...state,
                    post: [
                        {id: v1(), comm: state.newText.trim(), like: 0}, ...state.post],
                    newText: ""
                }
            }
            return state
        case SET_PROFILE:
            return {...state, profile: action.profile}
        case TOGGLE_FETCHING_PROFILE:
            return {...state, isFetching: action.isFetch}
        case CHANGE_STATUS_TEXT:
            return {...state, profileStatusText: action.newText, newStatusText: action.newText}
        case ADD_STATUS_TEXT:
            if (state.profileStatusText) {
                return {...state, profileStatusText: state.newStatusText}
            } else if (state.profileStatusText == '' || null) {
                return {...state, profileStatusText: '...'}
            }
            return state
        default:
            return state
    }
}

export default profileReducer;