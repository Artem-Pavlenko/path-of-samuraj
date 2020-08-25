import React from "react";
import {Users} from "../../redux/usersReducer";
import UserItem from "./user/UserItem";
import axios from 'axios'

type UsersType = {
    users: Array<Users>
    follow: (userID: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<Users>) => void
}

class Users extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    //
    // }
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then((responce) => {
            this.props.setUsers(responce.data.items)
        })
    }

    render() {
        return (
            <div>
                {this.props.users.map(user => {
                    let unFollow = () => {
                        this.props.unFollow(user.id)
                    }
                    let follow = () => {
                        this.props.follow(user.id)
                    }
                    return <UserItem
                        follow={follow}
                        unFollow={unFollow}
                        key={user.id}
                        user={user}
                    />
                })}
            </div>
        );
    }
}

export default Users;