import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/user img/Без названия.png'
import sNetwork from '../../assets/images/network_icon/rss.png'

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    photo: string | null
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <div className={s.network}>
                <img className={s.network}
                     src={sNetwork}
                     alt=""/>
                <div><span>f*** society</span></div>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.profileLogin}>
                        <div><span>{props.login}</span></div>
                        <div><img src={props.photo == null ? userPhoto : props.photo} alt=""/></div>
                    </div>
                    : <NavLink to={'/Login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;
