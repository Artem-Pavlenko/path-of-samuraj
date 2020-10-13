import React from 'react'
import s from './FormsControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    meta.error && console.log(meta.error)

    return (
        <div className={`${s.formControl} ${meta.error && s.error}`}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            <span>{meta.error}</span>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={hasError ? s.error : ''}>
            <div>
                <input type="text" {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


//или можно создать creator для элиментов

const FormControlCreator: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError ? s.error : ''}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input2: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControlCreator {...props}><input {...input} {...restProps}/> </FormControlCreator>
}

export const Textarea2 = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControlCreator {...props}><textarea {...input} {...restProps}/> </FormControlCreator>
}

type CreateField = {
    component: React.ComponentType | string
    name: string
    placeholder: string
    validate: any
}

export const createField = (component: any, name: string, placeholder?: string, validate?: any, type: string = 'text', text: string = '') => (
    <div>
        <Field component={component} type={type} name={name} placeholder={placeholder}
               validate={[validate]}/> {text}
    </div>
)
