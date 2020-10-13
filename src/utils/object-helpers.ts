import {UsersReducerType} from "../store/usersReducer";


//вспомогательная fn, которая помогает имьютабельно изменить в массиве какой-то объект
export const updateObjectInArray = (items: Array<UsersReducerType>, itemID: number, followed: boolean): Array<UsersReducerType> => {
   return  items.map(u => {
        if (u.id === itemID) {
            return {...u, followed}
        }
        return u
    })
}