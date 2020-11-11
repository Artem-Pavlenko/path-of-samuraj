import React from "react"
import {createField, Input, Textarea} from "../../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLength} from "../../../../utils/validators/validators";
import s from "../ProfileData/ProfileData.module.scss";
import style from "../../../Login/Login.module.scss"
import {UserProfileType} from "../../../../store/profileReducer";
import {connect} from "react-redux";
import {StateType} from "../../../../store/redux-store";

const maxLength15 = maxLength(15)
const maxLength30 = maxLength(30)
const maxLength50 = maxLength(50)

export type ProfileReduxFormType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
}
type ProfileType = {
    profile: UserProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileReduxFormType> & ProfileType> = ({
handleSubmit,error,profile,...props
                                                                                          }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span>Full name :</span>
                {createField(Input, "fullName", "full name", maxLength15)}
            </div>
            <div>
                <span>About me :</span>
                {createField(Input, "aboutMe", "about me", maxLength30)}
            </div>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
                <span>looking for a job :</span>
                {createField(Input, "lookingForAJob", "", maxLength30, "checkbox")}
            </div>
            <div>
                <span>My professional skills :</span>
                {createField(Textarea, "lookingForAJobDescription", "my skills", maxLength50)}
            </div>
            <div className={s.contacts}>
                Contacts: {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(key => {
                return <div key={key}>
                    <b>{key} :</b> {createField(Input, `contacts.${key}`, key, maxLength50)}
                </div>
            })}
            </div>
            <div>
                {error && <div className={style.formSummeryError}>
                    {error}
                </div>}
                <button>save</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state: StateType) => ({
    profile: state.profile.profile
})

const ProfileForm = connect(mapStateToProps)(ProfileDataForm)

const ProfileReduxForm = reduxForm<ProfileReduxFormType>({form: 'editProfile'})(ProfileForm)
export default ProfileReduxForm