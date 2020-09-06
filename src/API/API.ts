import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
    }
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
        return response.data
    })
}

export const following = (userID: number) => {
    return instance.post(`/follow/${userID}`, {})
        .then(response => {
            console.log("following response data", response.data)
            return response.data.resultCode
        })
}

export const unFollowing = (userID: number) => {
    return instance.delete(`/follow/${userID}`)
        .then(response => {
            console.log("unFollowing response data:", response.data)
            return response.data.resultCode
        })
}

export const getProfile = (userID: number) => {
    return instance.get(`/profile/${userID}`)
        .then(response => {
            console.log("get profile response data: ", response.data)
            return response.data
        })
}

export const authMe = () => {
    return instance.get(`auth/me`)
        .then(response => {
            console.log("auth/me:", response.data)
            return response.data
        })
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
            return response.data
        })
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => {
                console.log("auth/me:", response.data)
                return response.data
            })
    }
}

export const followingAPI = {
    following(userID: number){
        return instance.post(`/follow/${userID}`, {})
            .then(response => {
                console.log("following response data", response.data.resultCode)
                return response.data.resultCode
            })
    },
    unFollowing(userID: number) {
        return instance.delete(`/follow/${userID}`)
            .then(response => {
                console.log("unFollowing response data:", response.data.resultCode)
                return response.data.resultCode
            })
    }
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get(`/profile/${userID}`)
            .then(response => {
                console.log("get profile response data: ", response.data)
                return response.data
            })
    }
}