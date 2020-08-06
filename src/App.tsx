import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/Navbar";
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile"
import {StoreType} from "./redux/state";

type AppType = {
    store: StoreType
}

const App: React.FC<AppType> = (props)=> {
    let state = props.store.getState()

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <NavBar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialog'} render={() => <Dialogs
                        dataUsers={state.dialogsPage.dialog}
                        dataMess={state.dialogsPage.mess}
                        textareaValue={props.store.getState().dialogsPage.newMessText}
                        dispatch={props.store.dispatch.bind(props.store)}
                    />}/>
                    <Route path={'/profile'} render={() =>
                        <Profile
                            post={state.profilePost.post}
                            textForTextAreaValue={state.profilePost.newText}
                            dispatch={props.store.dispatch.bind(props.store)}
                        />}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;