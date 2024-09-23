import loginReducer from "./loginReduser";
import {ThunkDispatch} from "redux-thunk";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tableReducer from "./tableReduser";
const saveToLocalStorage = (state: AppStateType) => {
    try {
        localStorage.setItem('state', JSON.stringify(state))
    } catch (e) {
        console.error(e)
    }
}
const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state')
        return stateStr ? JSON.parse(stateStr) : undefined
    } catch (e) {
        console.error(e)
        return undefined
    }
}
let reducers = combineReducers({
    login: loginReducer,
    table: tableReducer
})
const persistedStore = loadFromLocalStorage();
type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>
const store = configureStore({reducer: reducers, preloadedState: persistedStore})
store.subscribe(() => {
    saveToLocalStorage(store.getState())
});
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, any>
export default store