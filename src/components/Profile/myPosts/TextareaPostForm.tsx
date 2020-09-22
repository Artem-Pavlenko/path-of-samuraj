import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {maxLength} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

export type FormPostType = {
    post: string
    //post = <Field ... name={"post"}.../>
}
const maxLength15 = maxLength(15)

const TextareaPost: React.FC<InjectedFormProps<FormPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"post"} placeholder={"write..."}
                       validate={[maxLength15]}
                />
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

const FormPost = reduxForm<FormPostType>({form: "post"})(TextareaPost)

export default FormPost;