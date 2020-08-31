import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/Navbar";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile"
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersPage from "./components/Users/UsersPage";



const App: React.FC = ()=> {
    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <NavBar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialog'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile'} render={() => <Profile/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/users'} render={() => <UsersPage />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;