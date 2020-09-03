import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/images_man.png'

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    photo: string | null
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYPGYbnTSEqgn9dtokDjdaZdVlRDitG8AVrg&usqp=CAU"
                alt=""/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>
                        {props.login}
                        <img src={props.photo == null ? userPhoto : props.photo} alt=""/>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
                {/*<div>*/}
                {/*    {props.login}*/}
                {/*    {props.photo == null ? userPhoto : props.photo}*/}
                {/*</div>*/}
            </div>
        </header>
    )
}

export default Header;
