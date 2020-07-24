import React from "react";
import s from "./../Dialogs.module.css";


type MessageType = {
    text: string
}

function Message(props: MessageType) {
    return (
        <div>
            <div className={s.message}> {props.text} </div>
        </div>
    )
}

export default Message;