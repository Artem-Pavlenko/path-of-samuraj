import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <NavBar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialog'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userID?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/users'} render={() => <UsersContainer />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;