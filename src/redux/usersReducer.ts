import {v1} from "uuid";
import {ActionsTypes, FollowUserAC, SetUsersAc, UnfollowUserAC} from "./redux-store";

//типизация для initialState
export type User = {
    fullName: string
    id: string
    live: {
        country: string
        cities: string
    }
    status: string
    followed: boolean
    photoURL: string
}
export type UsersType = {
    users: Array<User>
}
//CASE
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
//AC
export const followAC = (userId: string): FollowUserAC => ({type: FOLLOW, userID: userId})
export const unFollowAC = (userId: string): UnfollowUserAC => ({type: UNFOLLOW, userID: userId})
export const setUsersAC = (users: Array<User>): SetUsersAc => ({type: SET_USERS, users: users})

let initialState: UsersType = {
    users: []
}
const usersReducer = (state: UsersType = initialState, action: ActionsTypes): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users:[...state.users, ...action.users]}
        default:
            return state
    }
}


export default usersReducer;