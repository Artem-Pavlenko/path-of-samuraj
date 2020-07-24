import React from "react";
import s from "./Settings.module.css"

function Settings() {
    return(
        <div className={s.settingsWrapper}>
            Settings
            <div>
                <ul>
                    <li>My profile</li>
                    <li>Themes</li>
                    <li>Security</li>
                    <li>Exit</li>
                </ul>
            </div>
        </div>
    )
}

export default Settings;