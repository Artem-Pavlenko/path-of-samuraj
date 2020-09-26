import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../store/authReducer";
import {StateType} from "../../store/redux-store";

type StateToProps = {
    isAuth: boolean
    login: string | null
    photo: string | null
}
type DispatchToProps = {
    logout: () => void
}
type HeaderContainerType = StateToProps & DispatchToProps


class HeaderContainer extends React.Component<HeaderContainerType> {


    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} photo={this.props.photo}
                    logout={this.props.logout}/>
        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.data.login,
        photo: state.auth.photo
    }
}


export default connect(mapStateToProps, {logout})(HeaderContainer)