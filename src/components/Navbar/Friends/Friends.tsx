import React from "react";
import d from "./Friends.module.scss"

const Friends = () => {
    return (
        <div className={d.wrapper}>
            <h4 className={d.frTitle}>FRIEND'S</h4>
            <div className={d.friendProfileBlock}>
                <div className={d.acc}>
                    <img className={d.first}
                         title={"Yaroslav Nazim"}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUPeBwnoxS_N7Jz6STQ_b9MpfT4WMgSELY-A&usqp=CAU"
                         alt=""/>
                    <p>Martin</p>
                </div>
                <div className={d.acc}>
                    <img className={d.sec}
                         title={"Aleksandr Buhay"}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwxS30sCGi485rzab_QizqNnNty5c1FbYB7Q&usqp=CAU"
                         alt=""/>
                    <p>Bill</p>
                </div>
            </div>
        </div>
    )
}

export default Friends;