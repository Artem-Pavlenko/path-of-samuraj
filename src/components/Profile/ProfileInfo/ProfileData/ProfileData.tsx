import React, {useState} from "react"
import {UserProfileType} from "../../../../store/profileReducer";
import s from "../ProfileData/ProfileData.module.scss";
import Contact from "./Contact";
import btn from "../../../../common/layout/BTN.module.scss";


const ProfileData = (profile: UserProfileType) => {

    const [showContacts, setShowContacts] = useState<boolean>(false)
    const [btnValue, setBtnValue] = useState<'show contacts' | 'hide contacts'>('show contacts')

    const showHideContacts = () => {
        showContacts && setShowContacts(false)
        !showContacts && setShowContacts(true)
        btnValue === 'show contacts' && setBtnValue('hide contacts')
        btnValue === 'hide contacts' && setBtnValue('show contacts')
    }

    return (
        <div className={s.profileData}>
            <div>
                <span>Full name: </span>{profile.fullName}
            </div>
            <div>
                <span>About me:</span> {profile.aboutMe ? profile.aboutMe : "..."}
            </div>
            <div className={s.jobBlock}>
                {profile.lookingForAJob
                    ? <div><span>I`m looking for a job</span></div>
                    : <span>I have job</span>}
                {profile.lookingForAJobDescription && <div>
                    <span>My skills : </span>{profile.lookingForAJobDescription}
                </div>}
            </div>
            <button onClick={showHideContacts} style={{margin: "10px"}} className={btn.btn}>{btnValue}</button>
            {showContacts && <div className={s.contactsBlock}>
                <div>
                    <span>Contacts:</span> {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>}
        </div>
    )
}

export default ProfileData