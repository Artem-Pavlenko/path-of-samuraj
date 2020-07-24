import React from "react";
import s from "./Music.module.css"

function Music() {
    return (
        <div className={s.musicWrapper}>
            <div>
                <span className={s.titleSearch}>Search songs </span>
                <input className={s.input} type="text"/>
            </div>
            <div className={s.playList}>
             You haven`t songs =*(
            </div>
        </div>
    )
}

export default Music;