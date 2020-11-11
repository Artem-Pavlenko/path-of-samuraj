import React, {Suspense} from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux"
import {initializeApp} from "./store/appReducer";
import {StateType} from "./store/redux-store";
import Preloader2 from "./common/Preloader/PreloaderWithStyle/Preloader2";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import Profile from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Profile = React.lazy(() => import('./components/Profile/ProfileContainer'))

type AppStateToPropsType = {
    setInitialize: boolean
}
type AppDispatchToPropsType = {
    initializeApp: () => void
}
type AppType = AppDispatchToPropsType & AppStateToPropsType

class App extends React.Component<AppType> {
    catchAllUnhandledErrors = (rej: any) => {
        alert('some error')
        console.log(typeof rej)
        console.log('error(window) :', rej)
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
        this.props.initializeApp()
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.setInitialize) {
            return <Preloader2/>
        }

        return (
            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <NavBar/>
                <div className={"app-wrapper-content"}>
                        <Suspense fallback={<Preloader2/>}>
                        <Switch>
                            <Route path={'/dialog'} render={() => <DialogsContainer/>}/>
                            <Route path={'/profile/:userID?'} render={() => <Profile/>}/>
                            <Route path={'/news'} render={() => <News/>}/>
                            <Route path={'/music'} render={() => <Music/>}/>
                            <Route path={'/settings'} render={() => <Settings/>}/>

                            <Route path={'/users'} render={() => <UsersContainer/>}/>
                            <Route path={'/login'} render={() => <Login/>}/>

                            {/*<Route exact path={'/'}><Redirect to={'/login'} /></Route>*/}
                            <Redirect from={'/'} to={'/login'}/>
                            <Route render={ () => <div>404 not found</div>}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    setInitialize: state.app.initialized
})

export default compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App)