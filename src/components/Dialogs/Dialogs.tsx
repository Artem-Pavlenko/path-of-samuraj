import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionsTypes, addMessActionCreator, changeMessActionCreator} from "../../redux/state";

type DialogsDataType = {
    id: string
    name: string
}
type MessageDataType = {
    id: string
    message: string
}
type DialogsPropsType = {
    dataUsers: Array<DialogsDataType>
    dataMess: Array<MessageDataType>
    textareaValue: string
    dispatch: (action: ActionsTypes) => void
}


function Dialogs(props: DialogsPropsType) {

    function sendMess() {
        // props.dispatch(addMessActionCreator(props.textareaValue))
        // ниже рефактор
        props.dispatch(addMessActionCreator())
    }
    function onMessChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.dispatch(changeMessActionCreator( e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dataUsers.map(user => <DialogItem name={user.name} id={user.id}/>)}
            </div>
            <div className={s.messages}>
                {props.dataMess.map(mess => <Message text={mess.message}/>)}
                <textarea
                    placeholder={"write..."}
                    value={props.textareaValue}
                    onChange={onMessChange}
                />
                <div>
                    <button onClick={sendMess}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;