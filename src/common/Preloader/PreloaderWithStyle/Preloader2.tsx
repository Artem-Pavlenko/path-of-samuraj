import React from "react";
import s from "../PreloaderWithStyle/Preloader2.module.scss"



const Preloader2 = () => {
    return (
        <div className={s.cssload_container}>
            <div className={s.cssload_speeding_wheel}></div>
        </div>
    )
}

export default Preloader2