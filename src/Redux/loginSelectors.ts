import {AppStateType} from "./redux-store";
export const selectUsername = (state: AppStateType) => {
    return state.login.username
}
export const selectPassword = (state: AppStateType) => {
    return state.login.password
}
export const selectXAuth = (state: AppStateType) => {
    return state.login.xAuth
}
export const selectIsAuth = (state: AppStateType) => {
    return state.login.isAuth
}
export const selectIsFetchedL = (state: AppStateType) => {
    return state.login.isFetched
}