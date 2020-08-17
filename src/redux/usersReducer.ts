import {v1} from "uuid";
import {ActionsTypes} from "./redux-store";

type User = {
    fullName: string
    id: string
    live: {
        country: string
        cities: string
    }
    status: string

}
export type UsersType = {
    users: Array<User>
}

let initialState: UsersType = {
  users: [
      {fullName: "Artem Pavlenko", id: v1(), live: {country: "Ukraine", cities: "Kiev"},
          status: "I am looking for a job"},
      {fullName: "Yaroslav Nazim", id: v1(), live: {country: "Czech Republic", cities: "Mlada Boleslav"},
          status: "Pojebana Skoda"},
      {fullName: "Sasha Buhaj", id: v1(), live: {country: "Czech Republic", cities: "Mlada Boleslav"},
          status: "Do pice Cesko"}
  ]
}
const usersReducer = (state: UsersType = initialState, action: ActionsTypes): UsersType => {

    switch (action.type) {
        default:
            return state
    }
}

export default usersReducer;