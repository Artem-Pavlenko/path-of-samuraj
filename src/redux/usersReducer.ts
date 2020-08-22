import {v1} from "uuid";
import {ActionsTypes, FollowUserAC, SetUsersAc, UnfollowUserAC} from "./redux-store";

//типизация для initialState
// export type User = {
// //     fullName: string
// //     id: string
// //     live: {
// //         country: string
// //         cities: string
// //     }
// //     status: string
// //     followed: boolean
// //     photoURL: string
// // }
export type Users2 = {
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

export type UsersType2 = {
    items: Array<Users2>
}
// export type UsersType = {
//     users: Array<User>
// }
//CASE
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
//AC
export const followAC = (userId: number): FollowUserAC => ({type: FOLLOW, userID: userId})
export const unFollowAC = (userId: number): UnfollowUserAC => ({type: UNFOLLOW, userID: userId})
export const setUsersAC = (users: Array<Users2>): SetUsersAc => ({type: SET_USERS, items: users})

let initialState: UsersType2 = {
    items: []
}
const usersReducer = (state: UsersType2 = initialState, action: ActionsTypes): UsersType2 => {

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
            return {...state, items: [...state.items, ...action.items]}
        default:
            return state
    }
}


export default usersReducer;