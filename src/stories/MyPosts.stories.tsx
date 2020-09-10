import React from "react";
import {action} from "@storybook/addon-actions";
import MyPosts from "../components/Profile/myPosts/MyPosts";
import {v1} from "uuid";
import {ProfileType} from "../redux/profileReducer";

export default {
    title: "s'NETWORK/MyPost stories",
    component: MyPosts
}

let initialState: ProfileType = {
    post: [
        {id: v1(), comm: "It's my first post", like: 5},
    ],
    newText: "",
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            youtube: null
        },
        fullName: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
        userId: 1,
        photos: {
            large: null,
            small: null
        }
    },
    isFetching: true
}

export const MyPostsBaseExample = (props: any) => {
    return (
        <MyPosts
            addPost={action('addPost')}
            updatePostText={action('Update post text')}
            profilePage={initialState}
        />
    )
}