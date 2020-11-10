import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import item from '../../../common/layout/item.module.css'
import {savePhoto, saveProfileChange, updateProfileStatus, UserProfileType} from "../../../store/profileReducer";
import userIcon from '../../../assets/images/user img/fsociety-mask-549635.png'
import Preloader from "../../../common/Preloader/Preloader";
import {connect} from "react-redux";
import {compose} from "redux"
import {StateType} from "../../../store/redux-store";
import ProfileStatus from "./ProfileStatus";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {ProfileReduxFormType} from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";
import ProfileReduxForm from "./ProfileData/ProfileDataForm";
import Preloader2 from "../../../common/Preloader/PreloaderWithStyle/Preloader2";


type RouterType = RouteComponentProps<{ userID: string }>
type ProfileStateToPropsType = {
    isAuth: boolean
    profile: UserProfileType
    isFetch: boolean
    profileStatusText: string | null
}
type ProfileDispatchTOPropsType = {
    updateProfileStatus: (status: string) => void
    savePhoto: (photo: object) => void
    saveProfileChange: (data: ProfileReduxFormType) => Promise<void>
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

    const onEditSubmit = (data: ProfileReduxFormType) => {
        props.saveProfileChange(data).then( () => {
            setEditMode(false)
            setEditBtn('edit')
        })
    }

    return (
        <div className={s.profileBlock}>
            {
                props.isFetch
                    ? <Preloader2/>
                    : <div className={`${s.descriptionBlock} ${item.itemCase}`}>
                        <div className={s.avaAndStatus}>
                            <img className={s.avatar} src={props.profile.photos.large || userIcon} alt=''/>
                            <ProfileStatus status={props.profileStatusText}
                                           updateProfileStatus={props.updateProfileStatus}
                            />
                        </div>
                        {!props.match.params.userID && props.isAuth && <input type='file' onChange={onMainPhotoSelected}/>}
                        {!props.match.params.userID && props.isAuth &&  <div>
                            <button onClick={onEditMode}>{editBtn}</button>
                        </div>}

                        {editMode
                            ? <ProfileReduxForm onSubmit={onEditSubmit} initialValues={props.profile}/>
                            : <ProfileData {...props.profile}/>}
                    </div>
            }
        </div>
    )
}


let mapStateToProps = (state: StateType) => {
    return {
        profile: state.profile.profile,
        isFetch: state.profile.isFetching,
        profileStatusText: state.profile.profileStatusText,
        isAuth: state.auth.isAuth
    }
}


export default compose<React.ComponentType>(connect(mapStateToProps,
    {updateProfileStatus, savePhoto, saveProfileChange}), withRouter)(ProfileInfo)
