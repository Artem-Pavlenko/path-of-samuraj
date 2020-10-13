import React from "react";
import s from './Post.module.css'

type CommentType = {
    comment: string
    likeCount: number
}

const Post = React.memo((props: CommentType) => {
    return (
        <div className={s.posts}>
            <div className={s.item}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFl6_bcZtQuriN1f5RQsnNexOj2TlmhkaBw&usqp=CAU"
                    alt=""/>
                <span>{props.comment}</span>
                <div>
                    <span>Like's {props.likeCount}</span>
                </div>
            </div>
        </div>
    )
})

export default Post;