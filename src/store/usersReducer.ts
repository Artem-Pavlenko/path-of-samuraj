import {ActionsTypes, DispatchType} from "./redux-store";
import {followingAPI, userAPI} from "../API/API";


//типизация action
export type FollowUser = {
    type: "FOLLOW"
    userID: number
}
export type UnfollowUser = {
    type: "UNFOLLOW"
    userID: number
}
export type SetUsers = {
    type: "SET_USERS"
    items: Array<UsersReducerType>
}
export type SetCurrentPage = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
export type SetTotalCount = {
    type: 'SET_TOTAL_COUNT'
    totalCount: number
}
export type ToggleFetchingType = {
    type: 'TOGGLE_FETCHING'
    isFetch: boolean
}
export type setFollowingType = {
    type: 'SET_TOGGLE_FOLLOWING'
    userID: number
    isFetch: boolean
}

//типизация state/initialState
export type UsersReducerType = {
    name: string
    id: number
    uniqueUrlName: null,
    photos: {
        small: null | string,
        large: null | string
    },
    status: null,
    followed: boolean
}
type UsersStateType = {
    items: Array<UsersReducerType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: {
        userID: Array<number>
        isFetch: boolean
    }
}

//CASE
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const SET_TOGGLE_FOLLOWING = 'SET_TOGGLE_FOLLOWING'
//AC
export const follow = (userId: number): FollowUser => ({type: FOLLOW, userID: userId})
export const unFollow = (userId: number): UnfollowUser => ({type: UNFOLLOW, userID: userId})
export const setUsers = (users: Array<UsersReducerType>): SetUsers => ({type: SET_USERS, items: users})
export const setCurrentPage = (page: number): SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage: page})
export const setTotalCount = (totalCount: number): SetTotalCount => ({type: SET_TOTAL_COUNT, totalCount})
export const setToggleFetch = (isFetch: boolean): ToggleFetchingType => ({type: TOGGLE_FETCHING, isFetch: isFetch})
export const setToggleFollowing = (userID: number, isFetch: boolean): setFollowingType => ({
    type: SET_TOGGLE_FOLLOWING,
    userID,
    isFetch
})
//thunk
export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return (dispatch: DispatchType) => {
        dispatch(setToggleFetch(true))
        userAPI.getUsers(currentPage, pageSize).then((responseData) => {
            dispatch(setToggleFetch(false))
            dispatch(setUsers(responseData.items))
            dispatch(setTotalCount(responseData.totalCount))
        })
    }
}
//thunk
export const unFollowThunk = (userID: number) => {
    return (dispatch: DispatchType) => {
        dispatch(setToggleFollowing(userID, true))
        followingAPI.unFollowing(userID)
            .then((responseData) => {
                debugger
                if (responseData.resultCode === 0) {
                    dispatch(unFollow(userID))
                } else if (responseData.resultCode !== 0) {
                    alert(responseData.messages)
                }
            })
        dispatch(setToggleFollowing(userID, false))
    }
}
//thunk
export const followThunk = (userID: number) => {
    return (dispatch: DispatchType) => {
        dispatch(setToggleFollowing(userID, true))
        followingAPI.following(userID)
            .then((responseData) => {
                debugger
                if (responseData.resultCode === 0) {
                    dispatch(follow(userID))
                } else if (responseData.resultCode !== 0) {
                    alert(responseData.messages)
                }
            })
        dispatch(setToggleFollowing(userID, false))
    }
}

let initialState: UsersStateType = {
    items: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: {userID: [1], isFetch: false}
}
const usersReducer = (state: UsersStateType = initialState, action: ActionsTypes): UsersStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                items: state.items.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                items: state.items.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, items: [...action.items]}
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetch}
        case SET_TOGGLE_FOLLOWING:
            return {
                ...state,
                followingInProgress: {
                    ...state.followingInProgress, userID: action.isFetch
                        ? [...state.followingInProgress.userID, action.userID]
                        : state.followingInProgress.userID.filter(id => id !== action.userID)
                }
            }
        default:
            return state
    }
}

export default usersReducer;