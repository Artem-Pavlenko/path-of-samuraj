import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {maxLength} from "../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

export type TextareaFormType = {
    dialog: string
}

const maxLength15 = maxLength(15)

const TextareaDialog: React.FC<InjectedFormProps<TextareaFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"dialog"} placeholder={"write..."}
                       validate={[maxLength15]}
                />
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
}

const TextareaDialogsForm = reduxForm<TextareaFormType>({form: 'dialog'})(TextareaDialog)

export default TextareaDialogsForm;