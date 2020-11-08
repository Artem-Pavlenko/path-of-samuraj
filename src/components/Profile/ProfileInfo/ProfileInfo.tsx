import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import item from '../../../common/layout/item.module.css'
import {savePhoto, updateProfileStatus, UserProfileType} from "../../../store/profileReducer";
import userIcon from '../../../assets/images/user img/fsociety-mask-549635.png'
import Preloader from "../../../common/Preloader/Preloader";
import {connect} from "react-redux";
import {compose} from "redux"
import {StateType} from "../../../store/redux-store";
import ProfileStatus from "./ProfileStatus";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

type ContactType = {
    contactTitle: string
    contactValue: string | null
}

type RouterType = RouteComponentProps<{ userID: string }>
type ProfileStateToPropsType = {
    profile: UserProfileType
    isFetch: boolean
    profileStatusText: string | null
}
type ProfileDispatchTOPropsType = {
    updateProfileStatus: (status: string) => void
    savePhoto: (photo: object) => void
}
type profile = ProfileStateToPropsType & ProfileDispatchTOPropsType & RouterType

const ProfileInfo = (props: profile) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [editBtn, setEditBtn] = useState<'edit' | 'cancel'>('edit')

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onEditMode = () => {
        !editMode && setEditMode(true)
        editMode && setEditMode(false)
        editBtn === 'edit' && setEditBtn('cancel')
        editBtn === 'cancel' && setEditBtn('edit')
    }

    return (
        <div className={s.profileBlock}>
            {
                props.isFetch
                    ? <Preloader/>
                    : <div className={`${s.descriptionBlock} ${item.itemCase}`}>
                        <div className={s.avaAndStatus}>
                            <img className={s.avatar} src={props.profile.photos.large || userIcon} alt=''/>
                            <ProfileStatus status={props.profileStatusText}
                                           updateProfileStatus={props.updateProfileStatus}
                            />
                        </div>
                        {!props.match.params.userID && <input type='file' onChange={onMainPhotoSelected}/>}
                        {!props.match.params.userID && <div><button onClick={onEditMode}>{editBtn}</button></div>}

                        {editMode
                            ? <ProfileDataForm />
                            : <ProfileData{...props.profile}/>}
                    </div>
            }
        </div>
    )
}



const Contact = ({contactTitle, contactValue}: ContactType) => {
    return <div style={{paddingLeft: '10px'}}><b>{contactTitle}</b>: {contactValue !== null ? contactValue : ''}</div>
}

const ProfileData = ({ ...profile}: UserProfileType) => {
    return (
        <div>

            <div>
                <span>Full name: </span>{profile.fullName}
            </div>
            <div>
                <span>About me:</span> {profile.aboutMe === null ? "..." : profile.aboutMe}
            </div>
            <div className={s.jobBlock}>
                {profile.lookingForAJob
                    ? <div><span>I`m looking for a job</span></div>
                    : "I have job"}
                {profile.lookingForAJobDescription && <div>
                    <span>Description: </span>{profile.lookingForAJobDescription}
                </div>}
            </div>
            <div className={s.contactsBlock}>
                <div className={s.contacts}>
                    Contacts: {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
        </div>
    )
}
const ProfileDataForm = () => {
    return (
        <div>
            F O R M A
        </div>
    )
}


let mapStateToProps = (state: StateType) => {
    return {
        profile: state.profile.profile,
        isFetch: state.profile.isFetching,
        profileStatusText: state.profile.profileStatusText
    }
}


export default compose<React.ComponentType>(connect(mapStateToProps,
    {updateProfileStatus, savePhoto}), withRouter)(ProfileInfo)
