import React from "react";
import {addMessActionCreator, changeMessActionCreator} from "../../redux/dialogsReducer";
import {ReduxStore} from "../../redux/redux-store";
import Dialogs from "./Dialogs";


type DialogsPropsType = {
    store: ReduxStore
}

function DialogsContainer(props: DialogsPropsType) {
    let state = props.store.getState()
    function sendMess() {
        props.store.dispatch(addMessActionCreator())
    }
    function onMessChange(text: string) {
        props.store.dispatch(changeMessActionCreator(text))
    }

    return (
        <Dialogs
            textareaValue={state.dialogsPage.newMessText}
            dataMess={state.dialogsPage.mess}
            dataUsers={state.dialogsPage.dialog}
            onMessChange={onMessChange}
            onSendMess={sendMess}
        />
    )
}

export default DialogsContainer;