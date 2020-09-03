import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import axios from "axios";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import {HeaderReducerType, setAuthUserData, setPhoto, setPhotoType, setToggleFetchAuth} from "../../redux/authReducer";

type StateToProps = {
    isAuth: boolean
    login: string | null
    photo: string | null
}
type DispatchToProps = {
    setToggleFetchAuth: (isFetchHeader: boolean) => void
    setAuthUserData: (data: HeaderReducerType) => void
    setPhoto: (photo: string | null) => void
}
type HeaderContainerType = StateToProps & DispatchToProps


class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true // передаём ещё и cookie ("передаём запрос с авторизацией/полномочиями")
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    this.props.setToggleFetchAuth(false)
                    this.props.setAuthUserData(response.data)
                    axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + 7546) // + мой ID
                        .then((response) => {
                            this.props.setPhoto(response.data.photos.small)
                        })
                } else if (response.data.resultCode !== 0) {
                    alert(response.data.messages)
                }
            })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} photo={this.props.photo}/>
        )
    }
}

let mapStateToProps = (state: ReduxStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.data.login,
        photo: state.auth.photo
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        setToggleFetchAuth: (isFetchHeader: boolean) => {
            dispatch(setToggleFetchAuth(isFetchHeader))
        },
        setAuthUserData: (data: HeaderReducerType) => {
            dispatch(setAuthUserData(data))
        },
        setPhoto: (photo: string | null) => {
            dispatch((setPhoto(photo)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)