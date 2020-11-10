import React, {ChangeEvent, useState} from 'react';
import s from './Login.module.css'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../store/authReducer";
import {StateType} from "../../store/redux-store";
import {Redirect} from 'react-router-dom';


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type LoginForm = {
    captchaURL: string | null
}
type LoginStatePropsType = {
    error: Array<string>
    isAuth: boolean
}
type LoginDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
}
type LoginType = LoginStatePropsType & LoginDispatchPropsType


const maxLength8 = maxLength(8)

const LoginForm: React.FC<InjectedFormProps<FormDataType> & LoginForm> = (props) => {

    const [typeInput, setTypeInput] = useState<"password" | "text">("password")
    const onChangeShowPass = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setTypeInput("text")
        } else {
            setTypeInput("password")
        }
    }

    let validators = requiredField && maxLength8

    return (
        <form onSubmit={props.handleSubmit}>
            {createField(Input, 'email', 'login', requiredField)}
            {createField(Input, 'password', 'password', validators, typeInput)}
            <input type="checkbox" onChange={onChangeShowPass}/> show password
            {createField(Input, "rememberMe", 'password', validators, "checkbox", "remember me")}
            {props.error && <div className={s.formSummeryError}>{props.error}</div>}
            {props.captchaURL && <img src={props.captchaURL} alt=""/>}
            {props.captchaURL && createField(Input, 'captcha', 'captcha', requiredField, 'text')}
            <div className={s.btn}>
                <button>Login</button>
            </div>
        </form>
    )
}


const mapStateToProps1 = (state: StateType) => ({
    captchaURL: state.auth.captchaURL
})

const LoginWithConnect = connect(mapStateToProps1)(LoginForm)

// reduxForm - hoc, оборачивает в контейнерную компоненту и снабжает компоненту "своим" поведением
// <FormDataType> уточнение с какими пропсами прийдёт компонент, что бы внутри "под капотом" было понятней что иммено приходит
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginWithConnect)


const Login = ({error, isAuth, login}: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    //если залогинен прозойдёт редирект на стринице профиля
    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <div className={s.login}>
            <div className={s.loginBlock}>
                <h2>L O G I N</h2>
                {error.map((el) => <span className={s.errorSpan}>{el}</span>)}
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state: StateType): LoginStatePropsType => ({
    isAuth: state.auth.isAuth,
    error: state.auth.messages
})

export default connect(mapStateToProps, {login})(Login)

