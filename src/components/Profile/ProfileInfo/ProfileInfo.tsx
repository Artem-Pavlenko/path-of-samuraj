import React, {ChangeEvent} from "react";
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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
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
                        <div>
                            <span>Full name: </span>{props.profile.fullName}
                        </div>
                        <div>
                            <span>About me:</span> {props.profile.aboutMe === null ? "..." : props.profile.aboutMe}
                        </div>
                        <div className={s.jobBlock}>
                            {props.profile.lookingForAJob
                                ? <div><span>I`m looking for a job</span></div>
                                : "I have job"}
                            {props.profile.lookingForAJobDescription
                            && <div>
                                <span>Description: </span>{props.profile.lookingForAJobDescription}
                            </div>}
                        </div>
                        <div className={s.contactsBlock}>
                            <div className={s.contacts}>Contacts:</div>
                            <div>{props.profile.contacts.facebook && ' facebook : ' + props.profile.contacts.facebook}</div>
                            <div>{props.profile.contacts.instagram && ' instagram : ' + props.profile.contacts.instagram}</div>
                            <div>{props.profile.contacts.github && ' GitHub : ' + props.profile.contacts.github}</div>
                            <div>{props.profile.contacts.mainLink && ' main Link : ' + props.profile.contacts.mainLink}</div>
                            <div>{props.profile.contacts.twitter && ' twitter : ' + props.profile.contacts.twitter}</div>
                            <div>{props.profile.contacts.vk && ' vk : ' + props.profile.contacts.vk}</div>
                            <div>{props.profile.contacts.website && ' website : ' + props.profile.contacts.website}</div>
                            <div>{props.profile.contacts.youtube && ' youtube : ' + props.profile.contacts.youtube}</div>
                        </div>
                    </div>
            }
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
