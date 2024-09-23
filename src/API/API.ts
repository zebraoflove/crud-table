import axios from "axios";
import {dataRow, dataRowWtId} from "../Redux/tableReduser";

const instance = axios.create({
   baseURL: "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/"
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
type LoginResponseType = {
    "error_code": ResultCodesEnum,
    "error_message": string,
    "data": {
        "token": string
    },
    "profiling": string,
    "timings": null | number
}
export const loginAPI = {
    login(username: string, password: string) {
        return instance.post<LoginResponseType>('login', {username: username, password: password})
            .then(res => res.data)
    }
}
type StandardDataResponseType = {
        "error_code": ResultCodesEnum,
        "error_message": string,
        "data": dataRow[],
        "profiling": string,
        "timings": null | number
}
type DeleteDataResponseType = {
    "error_code": ResultCodesEnum,
    "error_message": string,
    "profiling": string,
    "timings": null | number
}
export const tableAPI = {
    async getData(token: string) {
        const res = await instance.get<StandardDataResponseType>('userdocs/get', {headers: {'x-auth': token}})
        return res.data
    },
    async addDataRow(token: string, dataRow: dataRowWtId) {
        const res = await instance.post<StandardDataResponseType>('userdocs/create', dataRow, {headers: {'x-auth': token}})
        return res.data
    },
    async deleteDataRow(token: string, id: string) {
        const res = await instance.post<DeleteDataResponseType>('userdocs/delete/' + id, {}, {headers: {'x-auth': token}})
        return res.data
    },
    async updateDataRow(token: string, dataRow: dataRowWtId, id: string) {
        const res = await instance.post<StandardDataResponseType>('userdocs/set/' + id, dataRow, {headers: {'x-auth': token}})
        return res.data
    }
}