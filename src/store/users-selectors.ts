import {StateType} from "./redux-store";
import {useCallback} from "react";
import {useSelector} from "react-redux";
import {UsersReducerType, UsersStateType} from "./usersReducer";

const userItems = useSelector<StateType, UsersStateType>(state => state.user)

export const getUsersSelector2 = useCallback((state: StateType) => {
    return state.user.items
}, [userItems.items])

export const getUsersSelector = (state: StateType) => {
    return state.user.items
}
export const getPageSizeSelector2 = useCallback( (state: StateType) => {
    return state.user.pageSize
}, [userItems.pageSize])

export const getPageSizeSelector = (state: StateType) => {
    return state.user.pageSize
}
export const getTotalUserCountSelector = (state: StateType) => {
    return state.user.totalUsersCount
}
export const getCurrentPageSelector = (state: StateType) => {
    return state.user.currentPage
}
export const getIsFetchingSelector = (state: StateType) => {
    return state.user.isFetching
}
export const getFollowingInProgressUserIdSelector = (state: StateType) => {
    return state.user.followingInProgress.userID
}