import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import axios from "axios";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import {HeaderReducerType, setAuthUserData, setToggleFetchAuth} from "../../redux/authReducer";

type HeaderContainerType = {
    setToggleFetchAuth: (isFetchHeader: boolean) => void
    setAuthUserData: (data: HeaderReducerType) => void
}


class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true // передаём ещё и cookie ("передаём запрос с авторизацией")
        })
            .then((response) => {
                console.log(response)
                this.props.setToggleFetchAuth(false)
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data)
                } else if (response.data.resultCode !== 0) {
                    alert(response.data.messages)
                }
            })
    }

    render() {
        return (
            <Header/>
        )
    }
}

let mapStateToProps = (state: ReduxStateType) => {
    return {}
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        setToggleFetchAuth: (isFetchHeader: boolean) => {
            dispatch(setToggleFetchAuth(isFetchHeader))
        },
        setAuthUserData: (data: HeaderReducerType) => {
            dispatch(setAuthUserData(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)