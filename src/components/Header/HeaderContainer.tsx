import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {authMe} from "../../store/authReducer";
import {ReduxStateType} from "../../store/redux-store";

type StateToProps = {
    isAuth: boolean
    login: string | null
    photo: string | null
}
type DispatchToProps = {
    authMe: () => void
}
type HeaderContainerType = StateToProps & DispatchToProps


class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        //thunk
        this.props.authMe()
        // authAPI.authMe()
        //     .then((responseData) => {
        //         if (responseData.resultCode === 0) {
        //             this.props.setToggleFetchAuth(false) // отрисовка 'login' или имя залогиненого пользователя
        //             this.props.setAuthUserData(responseData)
        //             axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + 7546) // + мой ID
        //                 .then((response) => {
        //                     this.props.setPhoto(response.data.photos.small)
        //                 })
        //         } else if (responseData.resultCode !== 0) {
        //             alert(responseData.messages)
        //         }
        //     })
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


export default connect(mapStateToProps, {authMe})(HeaderContainer)