import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


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
}


function Dialogs(props: DialogsPropsType) {
    let newMess: any = React.createRef()
    function sendMess() {
        let mess = newMess.current.value
        alert(mess)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dataUsers.map(user => <DialogItem name={user.name} id={user.id}/>)}
            </div>
            <div className={s.messages}>
                {props.dataMess.map(mess => <Message text={mess.message}/>)}
                <textarea ref={newMess}></textarea>
                <div>
                    <button onClick={sendMess}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;