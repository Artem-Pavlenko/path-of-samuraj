import React from "react";
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/user img/Без названия.png'
import sNetwork from '../../assets/images/network_icon/rss.png'

type DispatchToPropsType = {
    logout: () => void
}
type StateToPropsType = {
    isAuth: boolean
    login: string | null
    photo: string | null
}
type HeaderPropsType = StateToPropsType & DispatchToPropsType

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <div className={s.network}>
                <img className={s.network}
                     src={sNetwork}
                     alt=""/>
                <div><span>dev. society</span></div>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.profileLogin}>
                        <div>
                            <span>{props.login}</span>
                            <button onClick={props.logout}>log out</button>
                        </div>
                        <div><img src={props.photo == null ? userPhoto : props.photo} alt=""/></div>

                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;
