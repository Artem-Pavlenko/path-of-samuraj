import React, {useEffect, useState} from "react";
import s from "./News.module.scss";

function News() {

    // const [count, setCount] = useState(0)
    //
    // useEffect( ()=> {
    //     const interval = setInterval( () => {
    //         setCount(count + 2)
    //     }, 10)
    //     count >= 400 && clearInterval(interval)
    //     return () => clearInterval(interval)
    // }, [count])

    return (
        <div className={s.newsWrapper}>
            <span>Новости в мире</span>
            <ul>
                <li>news news news news news news news news news news </li>
                <li>Из-за короновируса ....</li>
                <li>React .......</li>
                <li>it it it it it it </li>
            </ul>
            {/*<div>*/}
            {/*    <span>{count}</span>*/}
            {/*</div>*/}
        </div>
    )
}

export default News;