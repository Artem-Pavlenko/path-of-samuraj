import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";

export type FormPostType = {
    post: string
}

const Textarea: React.FC<InjectedFormProps<FormPostType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"post"} placeholder={"write..."}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

const FormPost = reduxForm<FormPostType>({form: "post"})(Textarea)

export default FormPost;