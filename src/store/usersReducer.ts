import {StateType} from "./redux-store";
import {followingAPI, ResultCodesEnum, userAPI} from "../API/API";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";


//типизация action
export type FollowUser = {
    type: typeof FOLLOW
    userID: number
}
export type UnfollowUser = {
    type: typeof UNFOLLOW
    userID: number
}
export type SetUsers = {
    type: typeof SET_USERS
    items: Array<UsersReducerType>
}
export type SetCurrentPage = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetTotalCount = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isFetch: boolean
}
export type setFollowingType = {
    type: typeof SET_TOGGLE_FOLLOWING
    userID: number
    isFetch: boolean
}

type ActionsType = FollowUser | UnfollowUser | SetUsers | SetCurrentPage
    | SetTotalCount | ToggleFetchingType | setFollowingType

//типизация initialState
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
export type UsersStateType = {
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


let initialState: UsersStateType = {
    items: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: {
        userID: [],
        isFetch: false
    }
}
const usersReducer = (state: UsersStateType = initialState, action: ActionsType): UsersStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //updateObjectInArray вспомогательная fn, которая помогает имьютабельно изменить в массиве какой-то объект
                items: updateObjectInArray(state.items, action.userID, true)
                // items: state.items.map(u => {
                //     if (u.id === action.userID) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                //updateObjectInArray вспомогательная fn, которая помогает имьютабельно изменить в массиве какой-то объект
                items: updateObjectInArray(state.items, action.userID, false)
                // items: state.items.map(u => {
                //     if (u.id === action.userID) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
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
                    ...state.followingInProgress,
                    userID: action.isFetch
                        ? [...state.followingInProgress.userID, action.userID]
                        : state.followingInProgress.userID.filter(id => id !== action.userID)
                }
            }
        default:
            return state
    }
}

export default usersReducer;


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

type getStateType = () => StateType
type DispatchUsersType = Dispatch<ActionsType>



//thunk
export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch<ActionsType>, getState: getStateType) => {
        dispatch(setToggleFetch(true))
        let responseData = await userAPI.getUsers(currentPage, pageSize)
        dispatch(setToggleFetch(false))
        dispatch(setUsers(responseData.items))
        dispatch(setTotalCount(responseData.totalCount))
    }
}

type followUnfollowFlowType = {
    dispatch: Dispatch
    userID: number
    apiMethod: (userID: number) => any
    actionCreator: (userID: number) => any
}

const followUnfollowFlow = async (dispatch: Dispatch, userID: number, apiMethod: (userID: number) => any, actionCreator: (userID: number) => any) => {
    try {
        dispatch(setToggleFollowing(userID, true))
        const responseData = await apiMethod(userID)
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(actionCreator(userID))
        } else if (responseData.resultCode !== ResultCodesEnum.Success) {
            alert(responseData.messages)
        }
        dispatch(setToggleFollowing(userID, false))
    } catch (error) {
        console.log('userReducer FOLLOW/UNFOLLOW: ', error)
    }
}

export const unFollowThunk = (userID: number) => (dispatch: Dispatch) => {
    let apiMethod = followingAPI.unFollowing.bind(followingAPI)
    followUnfollowFlow(dispatch, userID, apiMethod, unFollow)

    // dispatch(setToggleFollowing(userID, true))
    // try {
    //     const responseData = await apiMethod(userID)
    //     if (responseData.resultCode === ResultCodesEnum.Success) {
    //         dispatch(actionCreator(userID))
    //     } else if (responseData.resultCode !== ResultCodesEnum.Success) {
    //         alert(responseData.messages)
    //     }
    //     dispatch(setToggleFollowing(userID, false))
    // } catch (error) {
    //     console.log('userReducer FOLLOW/UNFOLLOW: ', error)
    // }
}
//thunk
export const followThunk = (userID: number) => (dispatch: Dispatch) => {
    let apiMethod = followingAPI.following.bind(followingAPI)
    followUnfollowFlow(dispatch, userID, apiMethod, follow)

    // dispatch(setToggleFollowing(userID, true))
    // try {
    //     const responseData = await apiMethod(userID)
    //     if (responseData.resultCode === ResultCodesEnum.Success) {
    //         dispatch(actionCreator(userID))
    //     } else if (responseData.resultCode !== ResultCodesEnum.Success) {
    //         alert(responseData.messages)
    //     }
    //     dispatch(setToggleFollowing(userID, false))
    // }catch (error) {
    //     console.log('userReducer FOLLOW: ', error)
    // }
}
