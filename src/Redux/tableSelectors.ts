import {AppStateType} from "./redux-store";
export const selectDataRows = (state: AppStateType) => {
    return state.table.dataRows
}
export const selectUpdateModeId = (state: AppStateType) => {
    return state.table.updateModeId
}
export const selectIsFetchedT = (state: AppStateType) => {
    return state.table.isFetched
}