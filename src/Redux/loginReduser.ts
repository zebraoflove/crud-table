import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {loginAPI, ResultCodesEnum} from "../API/API";
import {getTableData} from "./tableReduser";
let initialState = {
    xAuth: null as null | string,
    username: null as null | string,
    password: null as null | string,
    isFetched: false,
    isAuth: false
}
export type InitialStateType = typeof initialState
export const actions = {
    setUsername: (username: string) => ({type: "CT/LOGIN/SET-USERNAME", username} as const),
    setPassword: (password: string) => ({type: "CT/LOGIN/SET-PASSWORD", password} as const),
    setXAuth: (xAuth: string) => ({type: "CT/LOGIN/SET-XAUTH", xAuth} as const),
    setIsFetched: (isFetched: boolean) => ({type: "CT/LOGIN/SET-IS-FETCHED", isFetched} as const),
    setIsAuth: (isAuth: boolean) => ({type: "CT/LOGIN/SET-IS-AUTH", isAuth} as const)
}
type ActionType = InferActionsTypes<typeof actions>
const loginReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CT/LOGIN/SET-USERNAME": {
            return {...state, username: action.username}
        }
        case "CT/LOGIN/SET-PASSWORD": {
            return {...state, password: action.password}
        }
        case "CT/LOGIN/SET-XAUTH": {
            return {...state, xAuth: action.xAuth}
        }
        case "CT/LOGIN/SET-IS-FETCHED": {
            return {...state, isFetched: action.isFetched}
        }
        case "CT/LOGIN/SET-IS-AUTH": {
            return {...state, isAuth: action.isAuth}
        }
        default: {
            return state
        }
    }
}
export const loginUser = (username: string, password: string): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    dispatch(actions.setIsFetched(true))
    let data = await loginAPI.login(username, password)
    if (data.error_code === ResultCodesEnum.Success) {
        let token = data.data.token
        dispatch(actions.setXAuth(token))
        dispatch(actions.setUsername(username))
        dispatch(actions.setPassword(password))
        dispatch(getTableData(token))
        dispatch(actions.setIsFetched(false))
        dispatch(actions.setIsAuth(true))
    } else  console.log("LOGIN ERROR")
}
export default loginReducer