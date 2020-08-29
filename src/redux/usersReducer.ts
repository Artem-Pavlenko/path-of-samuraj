import {ActionsTypes, FollowUser, SetCurrentPage, SetTotalCount, SetUsers, UnfollowUser} from "./redux-store";

export type Users = {
    name: string
    id: number
    uniqueUrlName: null,
    photos: {
        small: null,
        large: null
    },
    status: null,
    followed: boolean
}

export type UsersType = {
    items: Array<Users>
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

//CASE
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
//AC
export const followAC = (userId: number): FollowUser => ({type: FOLLOW, userID: userId})
export const unFollowAC = (userId: number): UnfollowUser => ({type: UNFOLLOW, userID: userId})
export const setUsersAC = (users: Array<Users>): SetUsers => ({type: SET_USERS, items: users})
export const setCurrentPageAC = (page: number): SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage: page})
export const setTotalCountAC = (totalCount: number): SetTotalCount => ({type: SET_TOTAL_COUNT, totalCount })

let initialState: UsersType = {
    items: [],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1
}
const usersReducer = (state: UsersType = initialState, action: ActionsTypes): UsersType => {

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
        default:
            return state
    }
}

export default usersReducer;