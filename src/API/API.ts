import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
    }
})

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
            return response.data
        })
    }
}

export const authAPI = {
    authMe() {
        return axiosInstance.get(`auth/me`)
            .then(response => {
                console.log("auth/me:", response.data)
                //возвращает нужный "кусок" ответа.
                return response.data
            })
    }
}

export const followingAPI = {
    following(userID: number) {
        return axiosInstance.post(`follow/${userID}`, {})
            .then(response => {
                console.log("following response data", response.data.resultCode)
                console.log("following response data", response)
                return response.data
            })
    },
    unFollowing(userID: number) {
        return axiosInstance.delete(`follow/${userID}`)
            .then(response => {
                console.log("unFollowing response data:", response.data.resultCode)
                return response.data
            })
    }
}

export const profileAPI = {
    getProfile(userID: number) {
        return axiosInstance.get(`profile/${userID}`)
            .then(response => {
                console.log("get profile response data: ", response.data)
                return response.data
            })
    },
    getStatus(userID: number){
        return axiosInstance.get(`profile/status/${userID}`)
            .then(response => {
                return response.data
            })
    }
}
