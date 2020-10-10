import {StateType} from "./redux-store";



export const getUsersSelector = (state: StateType) => {
    return state.user.items
}

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
