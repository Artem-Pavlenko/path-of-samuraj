import React from 'react';
import s from './Login.module.css'
import {reduxForm, Field, InjectedFormProps} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="input" type="text" name={"login"} placeholder={'Login'}/>
            </div>
            <div>
                <Field component="input" type="password" name={"password"} placeholder={'password'}/>
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
        console.log('formData log',formData)
    }

    return (
        <div className={s.login}>
            <div className={s.loginBlock}>
                <h2>L O G I N</h2>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

export default Login;

