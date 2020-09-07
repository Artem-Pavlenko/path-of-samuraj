import React from "react";
import s from "./ProfileInfo.module.css";
import {UserProfileType} from "../../../redux/profileReducer";
import userIcon from '../../../assets/images/user img/images_man.png'
import panorama from '../../../assets/images/panorama-photo-big.jpg'
import Preloader from "../../../common/Preloader/Preloader";

type profile = {
    profile: UserProfileType
    isFetch: boolean
}

function ProfileInfo(props: profile) {
    return (
        <div>
            <div className={s.content}>
                <img src={panorama} alt=""/>
            </div>
            {
                props.isFetch
                    ? <Preloader/>
                    : <div className={s.descriptionBlock}>
                        <img className={s.avatar}
                             src={props.profile.photos.large == null ? userIcon : props.profile.photos.large}
                             alt="..."/>
                        <div>
                            <span>Full name: </span>{props.profile.fullName}
                        </div>
                        <div>
                            <span>About me:</span> {props.profile.aboutMe == null ? "..." : props.profile.aboutMe}
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

export default ProfileInfo;