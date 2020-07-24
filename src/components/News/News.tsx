import React from "react";
import s from "./News.module.css";

function News() {
    return (
        <div className={s.newsWrapper}>
            <span>Новости в мире</span>
            <ul>
                <li>Илон Маск запустил новый проект и набирает новых программистов</li>
                <li>Из-за короновируса айтиха должна прорватся ещё сильнее </li>
                <li>React библеотека прогресирует всё больше и больше</li>
                <li>Не забудь стать react-разработчиком </li>
            </ul>
        </div>
    )
}

export default News;