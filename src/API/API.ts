import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type ResponseTyp<d = {}, n = number> = {
    data: d
    resultCode: n
    messages: string[]
}
export type EditProfile = {
    userId?: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts?: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data
            })
    }
}

export const authAPI = {
    authMe() {
        return axiosInstance.get<ResponseTyp<{ id: number, login: string, email: string }>>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return axiosInstance.post<ResponseTyp<{ userId: number }>>('/auth/login', {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return axiosInstance.delete<ResponseTyp>('/auth/login')
            .then(response => {
                return response.data.resultCode
            })
    }
}

export const securityAPI = {
    getCaptcha() {
        return axiosInstance.get('/security/get-captcha-url')
            .then(response => {
                console.log(response.data)
                return response.data.url
            })
    }
}

export const followingAPI = {
    following(userID: number) {
        return axiosInstance.post(`follow/${userID}`, {})
            .then(response => {
                return response.data
            })
    },
    unFollowing(userID: number) {
        return axiosInstance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    }
}

export const profileAPI = {
    getProfile(userID: number) {
        return axiosInstance.get(`profile/${userID}`).then(response => response.data)
    },
    getStatus(userID: string) {
        return axiosInstance.get(`profile/status/${userID}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return axiosInstance.put('profile/status', {status: status}).then(response => response.data)
    },
    updPhotos(photo: string | Blob) {
        // формируем объект
        const formData = new FormData()
        // добавляем парамерт 'image'(требование в документации к серваку) и добавляем файл
        formData.append('image', photo)
        return axiosInstance.put('/profile/photo', formData, {
            headers: {
                //при отправки файла настраиваем специфический заголовок. Потому как мы отпавляем не JSON данные, а файл
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfileChange(profile: EditProfile) {
        return axiosInstance.put('profile', profile).then(response => response.data)
    }
}
