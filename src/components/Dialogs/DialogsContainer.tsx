import {addMessActionCreator, changeMessActionCreator} from "../../store/dialogsReducer";
import {DispatchType, ReduxStateType} from "../../store/redux-store";
import {compose} from "redux"
import {connect} from "react-redux";
import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

type DialogsDataType = {
    id: string
    name: string
}
type MessageDataType = {
    id: string
    message: string
}
type DialogsPageType = {
    dialog: Array<DialogsDataType>
    mess: Array<MessageDataType>
    newMessText: string
}
type DialogsStatePropsType = {
    dialogsPage: DialogsPageType
}
type DialogsDispatchToPropsType = {
    onMessChange: (text: string) => void
    onSendMess: () => void
}
type DialogsPropsType = DialogsDispatchToPropsType & DialogsStatePropsType

export function Dialogs(props: DialogsPropsType) {

    function sendMess() {
        props.onSendMess()
    }

    function onMessChange(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onMessChange(e.currentTarget.value)
    }

    let dialogsPage = props.dialogsPage


    return (
        <div className={s.dialogsBlock}>
            <div className={s.containerMess}>
                <div className={s.dialogsItems}>
                    {dialogsPage.dialog.map(user => <DialogItem key={user.id} name={user.name} id={user.id}/>)}
                </div>
                <div className={s.messages}>
                    <div className={s.messTextBlock}>
                        {dialogsPage.mess.map(mess => <Message key={mess.id} text={mess.message}/>)}
                    </div>
                    <div className={s.sendMessBlock}>
                        <div className={s.textAreaBlock}>
                        <textarea
                            placeholder={"write..."}
                            value={dialogsPage.newMessText}
                            onChange={onMessChange}
                        />
                        </div>
                        <button onClick={sendMess}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state: ReduxStateType) => {
    return {
        dialogsPage: state.dialogs
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        onMessChange: (text: string) => {
            dispatch(changeMessActionCreator(text))
        },
        onSendMess: () => {
            dispatch(addMessActionCreator())
        }
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs) as React.ComponentClass
