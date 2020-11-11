import React from "react";
import s from './Navbar.module.scss'
import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";


const NavBar = () => {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <NavLink to={'/profile'} activeClassName={s.active}> Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/users'} activeClassName={s.active}> Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/dialog'} activeClassName={s.active}> Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/news'} activeClassName={s.active}> News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/music'} activeClassName={s.active}> Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/settings'} activeClassName={s.active}> Settings</NavLink>
            </div>
            <Friends/>
        </div>
    )
}

export default NavBar;