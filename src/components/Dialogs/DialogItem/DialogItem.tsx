import React from "react";
import s from "./DialogItem.module.scss";
import { NavLink } from "react-router-dom";

type DialogType = {
    name: string
    id: string
}

//имена, кто написал  в сообщениях
const DialogItem = (props: DialogType) => {
    // let path = "/dialogs/" + props.id
    return (
        <div className={s.dialog}>
            <NavLink activeClassName={s.active} to={"/dialog/" + props.id}> {props.name} </NavLink>
        </div>
    )
}

export default DialogItem;