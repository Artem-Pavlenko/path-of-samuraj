import React from "react";
import s from'./Header.module.css';
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYPGYbnTSEqgn9dtokDjdaZdVlRDitG8AVrg&usqp=CAU"
                alt=""/>
                <div className={s.loginBlock}>
                    <NavLink to={'/login'}>Login</NavLink>
                </div>
        </header>
    )
}

export default Header;
