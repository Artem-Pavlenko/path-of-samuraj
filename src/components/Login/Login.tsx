import React from 'react';
import s from './Login.module.css'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength20 = maxLength(20)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} type="text" name={"login"} placeholder={'login'}
                       validate={[requiredField, maxLength20]}
                />
            </div>
            <div>
                <Field component={Input} type="password" name={"password"} placeholder={'password'}
                       validate={[requiredField, maxLength20]}
                />
            </div>
            <div>
                <Field component="input" type="checkbox" name={"rememberMe"}/> remember me
            </div>
            <div className={s.btn}>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log('formData log', formData)
    }

    return (
        <div className={s.login}>
            <div className={s.loginBlock}>
                <h2>L O G I N</h2>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Login;

