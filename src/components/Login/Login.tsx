import React, {ChangeEvent, useState} from 'react';
import s from './Login.module.css'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../store/authReducer";
import {StateType} from "../../store/redux-store";
import {Redirect} from 'react-router-dom';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginType = {
    img: string | null
    error: Array<string>
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    const [typeInput, setTypeInput] = useState<"password" | "text">("password")
    const onChangeShowPass = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setTypeInput("text")
        } else {
            setTypeInput("password")
        }
    }


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} type="text" name={"email"} placeholder={'login'}
                       validate={[requiredField]}
                />
            </div>
            <div>
                <Field component={Input} type={typeInput} name={"password"} placeholder={'password'}
                       validate={[requiredField]}
                />
                <input type="checkbox" onChange={onChangeShowPass}/>show password
            </div>
            <div>
                <Field component="input" type="checkbox" name={"rememberMe"}/> remember me
            </div>
            {props.error && <div className={s.formSummeryError}>
                {props.error}
            </div>}
            <div className={s.btn}>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div className={s.login}>
            <div className={s.loginBlock}>
                <h2>L O G I N</h2>
                {props.error.map((el) => <span className={s.errorSpan}>{el}</span>)}
                <LoginReduxForm onSubmit={onSubmit}/>
                {props.img ? <img src={props.img} alt=""/> : ''}
            </div>
        </div>
    )
}

let mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.messages,
    img: state.auth.img
})

export default connect(mapStateToProps, {login})(Login)

