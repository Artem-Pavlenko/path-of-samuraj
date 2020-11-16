import React from "react";
import s from "./ModalWindow.module.scss"

type ModalType = {
    onBackgroundClick?: () => void | false
}

const ModalWindow = ({onBackgroundClick = () => false}: ModalType) => {
    return (
        <div className={s.modalBlock} onClick={onBackgroundClick}>
            <div className={s.popupContentBlock}>
                <div className={s.popupContent}>
                    Bla...Bla...Bla...Bla...Bla...
                </div>
            </div>
        </div>
    )
}

export default ModalWindow