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
import {StoreType} from "./state/state";

type DialogsDataType = {
    id: string
    name: string
}
type MessageDataType = {
    id: string
    message: string
}
type CommentType = {
    comm: string
    like: number
    id: string
}
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
                        dataUsers={state.dialogsPageType.dialog}
                        dataMess={state.dialogsPageType.mess}
                    />}/>
                    <Route path={'/profile'} render={() =>
                        <Profile
                            post={state.profilePost.post}
                            textForTextAreaValue={state.profilePost.newText}
                            addPost={props.store.addPost.bind(props.store)}
                            updatePostText={props.store.changeNewText.bind(props.store)}
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