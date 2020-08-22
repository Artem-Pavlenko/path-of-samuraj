import React from "react";
import {User} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import {v1} from "uuid";

type UsersType = {
    users: Array<User>
    follow: (userID: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<User>) => void
}

function Users(props: UsersType) {
    if (props.users.length === 0) {
        props.setUsers([
            {
                fullName: "Artem Pavlenko", id: v1(), live: {country: "Ukraine", cities: "Kiev"},
                status: "I am looking for a job", followed: false,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxaSAQ-3ugbOLGeQkTEs68Dr8VwESZIuQreA&usqp=CAU"
            },
            {
                fullName: "Yaroslav Nazim", id: v1(), live: {country: "Czech Republic", cities: "Mlada Boleslav"},
                status: "Pojebana Skoda", followed: true,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRadSxUEhz1rPGOHqjHDOL-tPm-xKrGbCuo7Q&usqp=CAU"
            },
            {
                fullName: "Sasha Buhaj", id: v1(), live: {country: "Czech Republic", cities: "Mlada Boleslav"},
                status: "Do pice Cesko", followed: false,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTU3bNrM2qO-zlrb85BFZrwKopyILyQ6QXxqw&usqp=CAU"
            }
        ])
    }

    return (
        <div>
            {props.users.map(user => {
                function unFollow() {
                    props.unFollow(user.id)
                }
                function follow() {
                    props.follow(user.id)
                }
                return <UserItem follow={follow} unFollow={unFollow} key={user.id} user={user}/>
            })}
        </div>
    )
}

export default Users;