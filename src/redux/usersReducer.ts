import {
    ActionsTypes,
    FollowUser,
    SetCurrentPage,
    SetTotalCount,
    SetUsers, ToggleFetchingType,
    UnfollowUser
} from "./redux-store";

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
}

//CASE
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

//AC
export const follow = (userId: number): FollowUser => ({type: FOLLOW, userID: userId})
export const unFollow = (userId: number): UnfollowUser => ({type: UNFOLLOW, userID: userId})
export const setUsers = (users: Array<UsersReducerType>): SetUsers => ({type: SET_USERS, items: users})
export const setCurrentPage = (page: number): SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage: page})
export const setTotalCount = (totalCount: number): SetTotalCount => ({type: SET_TOTAL_COUNT, totalCount })
export const setToggleFetch = (isFetch: boolean): ToggleFetchingType => ({type: TOGGLE_FETCHING, isFetch: isFetch})

let initialState: UsersStateType = {
    items: [],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
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
        default:
            return state
    }
}

export default usersReducer;