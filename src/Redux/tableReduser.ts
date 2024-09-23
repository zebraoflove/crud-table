import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ResultCodesEnum, tableAPI} from "../API/API";
export type dataRowWtId = {
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string
}
export type dataRow = {
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string
    id: string
}
let initialState = {
    dataRows: null as null | dataRow[],
    updateModeId: '',
    isFetched: false
}
export type InitialStateType = typeof initialState
export const actions = {
    setInitialDataRows: (dataRows: dataRow[]) => ({type: "CT/TABLE/SET-INITIAL-DATA-ROWS", dataRows} as const),
    changeUpdateMode: (modeId: string) => ({type: "CT/TABLE/CHANGE-UPDATE-MODE", modeId} as const),
    setIsFetched: (isFetched: boolean) => ({type: "CT/LOGIN/SET-IS-FETCHED", isFetched} as const)
}
type ActionType = InferActionsTypes<typeof actions>
const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CT/TABLE/SET-INITIAL-DATA-ROWS": {
            return {
                ...state, dataRows: action.dataRows
            }
        }
        case "CT/TABLE/CHANGE-UPDATE-MODE": {
            return {
                ...state, updateModeId: action.modeId
            }
        }
        case "CT/LOGIN/SET-IS-FETCHED": {
            return {
                ...state, isFetched: action.isFetched
            }
        }
        default: {
            return state
        }
    }
}
export const getTableData = (token: string): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    dispatch(actions.setIsFetched(true))
    let data = await tableAPI.getData(token)
    if(data.error_code === ResultCodesEnum.Success) {
        dispatch(actions.setInitialDataRows(data.data))
    }
    dispatch(actions.setIsFetched(false))
}
export const addDataRow = (token: string, dataRow: dataRowWtId): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    dispatch(actions.setIsFetched(true))
    let data = await tableAPI.addDataRow(token, dataRow)
    if(data.error_code === ResultCodesEnum.Success) {
        await dispatch(getTableData(token))
    }
    dispatch(actions.setIsFetched(false))
}
export const deleteDataRow = (token: string, id: string): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    dispatch(actions.setIsFetched(true))
    let data = await tableAPI.deleteDataRow(token, id)
    if(data.error_code === ResultCodesEnum.Success) {
        await dispatch(getTableData(token))
    }
    dispatch(actions.setIsFetched(false))
}
export const updateDataRow = (token: string, dataRow: dataRowWtId, id: string): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    dispatch(actions.setIsFetched(true))
    let data = await tableAPI.updateDataRow(token, dataRow, id)
    if(data.error_code === ResultCodesEnum.Success) {
        dispatch(actions.changeUpdateMode(''))
        await dispatch(getTableData(token))
    }
    dispatch(actions.setIsFetched(false))
}
export default tableReducer