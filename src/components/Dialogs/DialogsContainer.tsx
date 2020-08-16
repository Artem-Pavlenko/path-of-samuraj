import React from "react";
import {addMessActionCreator, changeMessActionCreator} from "../../redux/dialogsReducer";
import {DispatchType, ReduxState, ReduxStore} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ActionsTypes} from "../../redux/store";

// type DialogsPropsType = {
//     store: ReduxStore
// }
//
// function DialogsContainer(props: DialogsPropsType) {
//     let state = props.store.getState()
//     function sendMess() {
//         props.store.dispatch(addMessActionCreator())
//     }
//     function onMessChange(text: string) {
//         props.store.dispatch(changeMessActionCreator(text))
//     }
//
//     return (
//         <Dialogs
//
//             dialogsPage={state.dialogsPage}
//             onMessChange={onMessChange}
//             onSendMess={sendMess}
//         />
//     )
// }
//


let mapStateToProps = (state: ReduxState) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: (actions: ActionsTypes)=> void) => {
    return {
        onMessChange: (text: string) => { dispatch(changeMessActionCreator(text)) },
        onSendMess: () => { dispatch(addMessActionCreator()) }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;