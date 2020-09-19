import React from "react";
import  {reduxForm, Field, InjectedFormProps} from "redux-form";

export type TextareaFormType = {
    dialog: string
}

const Textarea: React.FC<InjectedFormProps<TextareaFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"dialog"} placeholder={"write..."}/>
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
}

const TextareaDialogsForm = reduxForm<TextareaFormType>({form: 'dialog'})(Textarea)

// type TextareaDispatchToPropsType = {
//     sendMess: (mess: string) => void
// }
//
// const TextareaForm: React.FC<TextareaDispatchToPropsType> = (props) => {
//
//     const onSubmit = (formData: TextareaFormType) => {
//         props.sendMess(formData.dialog)
//     }
//
//     return (
//         <div>
//             <h3>message</h3>
//             <FormDialog onSubmit={onSubmit}/>
//         </div>
//     )
//
// }

export default TextareaDialogsForm;