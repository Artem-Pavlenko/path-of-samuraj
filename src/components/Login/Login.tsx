import React, {ChangeEvent, useState} from 'react';
import s from './Login.module.css'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../store/authReducer";
import {StateType} from "../../store/redux-store";
import {Redirect} from 'react-router-dom';



type LoginStatePropsType = {
    captchaURL: string | null
    error: Array<string>
    isAuth: boolean
}
type LoginDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type LoginType = LoginStatePropsType & LoginDispatchPropsType

const maxLength8 = maxLength(8)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

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
            {createField(Input, 'email','login', requiredField)}
            {/*<div>*/}
            {/*    <Field component={Input} type="text" name={"email"} placeholder={'login'}*/}
            {/*           validate={[requiredField]}*/}
            {/*    />*/}
            {/*</div>*/}

            {createField(Input, 'password','password', validators, typeInput)}
            {/*<div>*/}
            {/*    <Field component={Input} type={typeInput} name={"password"} placeholder={'password'}*/}
            {/*           validate={[requiredField, maxLength8]}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*{createField('input', 'rememberMe',undefined, null, 'checkbox', 'remember me')}*/}
            <input type="checkbox" onChange={onChangeShowPass}/>show password
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

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
// reduxForm - hoc, оборачивает в контейнерную компоненту и снабжает компоненту "своим" поведением
// <FormDataType> уточнение с какими пропсами прийдёт компонент, что бы внутри "под капотом" было понятней что иммено приходит
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


const Login = ({error, isAuth, login, captchaURL}: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe)
    }
    //если залогинен прозойдёт редирект на стринице профиля
    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <div className={s.login}>
            <div className={s.loginBlock}>
                <h2>L O G I N</h2>
                {error.map((el) => <span className={s.errorSpan}>{el}</span>)}
                <LoginReduxForm onSubmit={onSubmit}/>
                {captchaURL && <img src={captchaURL} alt=""/>}
                {captchaURL && <input type="text"/>}

            </div>
        </div>
    )
}

let mapStateToProps = (state: StateType): LoginStatePropsType => ({
    isAuth: state.auth.isAuth,
    error: state.auth.messages,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {login})(Login)

