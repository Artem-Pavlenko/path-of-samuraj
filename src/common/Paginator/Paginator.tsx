import React from "react";
import s from "../../common/Paginator/Paginator.module.css";

type DispatchToUsersPropsType = {
    onPageChanged: (page: number) => void
}
type StateToUsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
}
type UsersItemPageType = DispatchToUsersPropsType & StateToUsersPropsType


const Paginator = (props: UsersItemPageType) => {

    let pageCount = Math.ceil((props.totalUsersCount / props.pageSize) / 50) //делю на 50 чтобы отображалось меньше страниц
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
            <div className={s.HeaderUserBlock}>
                <div className={s.pageNumber}>
                    {pages.map(p => {  //отрисовка к-во страниц пользователей/50(розделена на 50 для удобства просмотра)
                        return <span key={p} onClick={() => {props.onPageChanged(p)}}
                            className={props.currentPage === p ? s.selectedPage : ''}
                        >
                            {p}
                        </span>
                    })}
                </div>
            </div>
    )
}


export default Paginator;