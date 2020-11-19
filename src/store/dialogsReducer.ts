import {v1} from "uuid";

//типизация initialState
export type DialogsDataType = {
    id: string
    name: string
}
export type MessageDataType = {
    id: string
    message: string
}
export type DialogsPageType = {
    dialog: Array<DialogsDataType>
    mess: Array<MessageDataType>
}
//типизация ActionCreators
export type AddMessActionType = {
    type: typeof ADD_MESS
    mess: string
}
//ActionsType
type ActionsType = AddMessActionType
//case:
const ADD_MESS = "dialogs/ADD_MESS"

//ActionCreators
export const addMess = (mess: string): AddMessActionType => ({
    type: ADD_MESS , mess
})

let initialState: DialogsPageType = {
    dialog: [
        {id: v1(), name: "Artem"},
        {id: v1(), name: "Dima"},
        {id: v1(), name: "Goga"},
        {id: v1(), name: "Alex"},
        {id: v1(), name: "Vlad"},
        {id: v1(), name: "Yarik"}
    ],
    mess: [
        {id: v1(), message: "Hello"},
        {id: v1(), message: "How are you ?"},
        {id: v1(), message: "What are you think about React?"},
        {id: v1(), message: "=)"},
        {id: v1(), message: "LOL"}
    ]
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {

    switch (action.type) {
        case ADD_MESS:
            return {
                ...state,
                mess: [...state.mess,{id: v1(), message: action.mess}]
            }
        default:
            return state
    }
}

export default dialogsReducer;