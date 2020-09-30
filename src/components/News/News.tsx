import React, {useEffect, useState} from "react";
import s from "./News.module.css";

function News() {

    const [count, setCount] = useState(0)
    useEffect( ()=> {
        const interval = setTimeout( () => {
            setCount(count + 2)
        }, 10)
        count >= 400 && clearInterval(interval)
        return () => clearInterval(interval)
    }, [count])

    return (
        <div className={s.newsWrapper}>
            <span>Новости в мире</span>
            <ul>
                <li>Илон Маск запустил новый проект и набирает новых программистов</li>
                <li>Из-за короновируса айтиха должна прорватся ещё сильнее </li>
                <li>React библеотека прогресирует всё больше и больше</li>
                <li>Не забудь стать react-разработчиком </li>
            </ul>
            <div>
                <span>{count}</span>
            </div>
        </div>
    )
}

export default News;