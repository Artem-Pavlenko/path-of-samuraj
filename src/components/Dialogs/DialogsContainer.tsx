import { addMessActionCreator} from "../../store/dialogsReducer";
import {DispatchType, StateType} from "../../store/redux-store";
import {compose} from "redux"
import {connect} from "react-redux";
import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import  {TextareaFormType} from "./TextareaDialogsForm";
import TextareaDialogsForm from "./TextareaDialogsForm";

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
    onSendFormMess: (mess: string) => void
}
type DialogsPropsType = DialogsDispatchToPropsType & DialogsStatePropsType

export function Dialogs(props: DialogsPropsType) {

    function onSubmit (formData: TextareaFormType) {
        props.onSendFormMess(formData.dialog)
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
                    <div>
                        <h3>messages</h3>
                        <TextareaDialogsForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogs
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        onSendFormMess: (mess: string) => {
            dispatch(addMessActionCreator(mess))
        }
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs) as React.ComponentClass
