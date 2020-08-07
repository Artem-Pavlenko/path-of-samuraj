import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionsTypes} from "../../redux/store";
import {addMessActionCreator, changeMessActionCreator} from "../../redux/dialogsReducer";

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
    onMessChange: (text: string)=> void
    onSendMess: () => void
}


function Dialogs(props: DialogsPropsType) {

    function sendMess() {
        props.onSendMess()
    }
    function onMessChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onMessChange( e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dataUsers.map(user => <DialogItem key={user.id} name={user.name} id={user.id}/>)}
            </div>
            <div className={s.messages}>
                {props.dataMess.map(mess => <Message key={mess.id} text={mess.message}/>)}
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