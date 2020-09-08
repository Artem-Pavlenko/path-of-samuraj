import {addMessActionCreator, changeMessActionCreator} from "../../redux/dialogsReducer";
import {DispatchType, ReduxStateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state: ReduxStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        onMessChange: (text: string) => { dispatch(changeMessActionCreator(text)) },
        onSendMess: () => { dispatch(addMessActionCreator()) }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;