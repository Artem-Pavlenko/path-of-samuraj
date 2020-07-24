//С урока про типизацию в ts

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
}
type PostType = {
    id: number
    message: string
    likesCount: number
}
type ProfilePageType = {
    posts: Array<PostType>
}
type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

let stateLess: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blablabla', likesCount: 12},
            {id: 4, message: 'Pfff', likesCount: 12}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Artem'},
            {id: 2, name: 'Valya'},
            {id: 3, name: 'Tolik'},
            {id: 4, name: 'Lew'},
            {id: 5, name: 'Yarik'},
            {id: 6, name: 'Ignat'}
        ],
        messages: [
            {id: 1, message: 'Privet'},
            {id: 2, message: 'I need money, bitch'},
            {id: 3, message: 'How about you ?'},
            {id: 4, message: 'Chiks'},
            {id: 5, message: 'Bla Bla Bla'},
            {id: 6, message: 'React it\'s cool'}
        ]
    },
}

export default stateLess;