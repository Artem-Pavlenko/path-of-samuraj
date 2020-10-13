import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Profile from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux"
import {initializeApp} from "./store/appReducer";
import {StateType} from "./store/redux-store";
import Preloader from "./common/Preloader/Preloader";

type AppStateToPropsType = {
    setInitialize: boolean
}
type AppDispatchToPropsType = {
    initializeApp: () => void
}
type AppType = AppDispatchToPropsType & AppStateToPropsType

class App extends React.Component<AppType> {
    componentDidMount() {
        //'thunk'
        this.props.initializeApp()
    }

    render() {
        if (!this.props.setInitialize) {
            return <Preloader/>
        }
        return (

            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <NavBar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialog'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userID?'} render={() => <Profile/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    setInitialize: state.app.initialized
})

export default compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App)