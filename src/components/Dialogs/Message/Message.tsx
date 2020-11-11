import React from "react";
import s from "./Message.module.scss";


type MessageType = {
    text: string
}

//сообщения в Messages
function Message(props: MessageType) {
    return <div className={s.mess}> {props.text} </div>
}

export default Message;