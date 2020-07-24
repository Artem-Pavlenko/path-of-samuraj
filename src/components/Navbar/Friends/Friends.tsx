import React from "react";
import d from "./Friends.module.css"

function Friends() {
    return (
        <div className={d.wrapper}>
            <h4 className={d.frTitle}>FRIEND'S</h4>
            <div className={d.acc}>
                <img className={d.first}
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUPeBwnoxS_N7Jz6STQ_b9MpfT4WMgSELY-A&usqp=CAU"
                     alt=""/>
                <p>Yarik</p>
            </div>
            <div className={d.acc}>
                <img className={d.sec}
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwxS30sCGi485rzab_QizqNnNty5c1FbYB7Q&usqp=CAU"
                     alt=""/>
                <p>Siner</p>
            </div>
        </div>
    )
}

export default Friends;