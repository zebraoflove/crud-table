import {
    Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField
} from "@mui/material";
import React, {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import s from '../../App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {selectDataRows, selectIsFetchedT, selectUpdateModeId} from "../../Redux/tableSelectors";
import {actions, addDataRow, dataRow, dataRowWtId, deleteDataRow, updateDataRow} from "../../Redux/tableReduser";
import Typography from "@mui/material/Typography";
import {selectXAuth} from "../../Redux/loginSelectors";
import {AppDispatchType} from "../../Redux/redux-store";
import Preloader from "../../Common/Preloader";

export const TableBox = () => {
    const [documentNameErrorMessage, setDocumentNameErrorMessage] = useState('')
    const [documentStatusErrorMessage, setDocumentStatusErrorMessage] = useState('')
    let isFetched = useSelector(selectIsFetchedT)
    const updateModeId: string = useSelector(selectUpdateModeId)
    const dataRows = useSelector(selectDataRows)
    let token = useSelector(selectXAuth)
    if (!token) token = ''
    const dispatch: AppDispatchType = useDispatch()
    const handleChangeUpdateMode = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const id = event.currentTarget.id
        dispatch(actions.changeUpdateMode(id))
    }
    const handleInteractDataRow = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const documentName = document.getElementById('documentName') as HTMLInputElement;
        const documentType = document.getElementById('documentType') as HTMLInputElement;
        const documentStatus = document.getElementById('documentStatus') as HTMLInputElement;
        const companySignatureName = document.getElementById('companySignatureName') as HTMLInputElement;
        const companySigDate = document.getElementById('companySigDate') as HTMLInputElement;
        const employeeNumber = document.getElementById('employeeNumber') as HTMLInputElement;
        const employeeSignatureName = document.getElementById('employeeSignatureName') as HTMLInputElement;
        const employeeSigDate = document.getElementById('employeeSigDate') as HTMLInputElement;
        let isValid = true
        if (!documentName.value) {
            setDocumentNameErrorMessage('This field is required')
            isValid = false
        }
        else {
            setDocumentNameErrorMessage('')
        }
        if (!documentStatus.value) {
            setDocumentStatusErrorMessage('This field is required')
            isValid = false
        }
        else {
            setDocumentStatusErrorMessage('')
        }
        if(isValid) {
            const dataRow: dataRowWtId = {
                companySigDate: companySigDate.value,
                companySignatureName: companySignatureName.value,
                documentName: documentName.value,
                documentStatus: documentStatus.value,
                documentType: documentType.value,
                employeeNumber: employeeNumber.value,
                employeeSigDate: employeeSigDate.value,
                employeeSignatureName: employeeSignatureName.value
            }
            if (event.currentTarget.id) {
                const id = event.currentTarget.id
                dispatch(updateDataRow(token, dataRow, id))
            } else {
                dispatch(addDataRow(token, dataRow))
            }
        }
    }
    const handleDeleteRaw = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const id = event.currentTarget.id
        dispatch(deleteDataRow(token, id))
    }
    const TextFieldNames = [
        {id: "documentName"},
        {id: "documentType"},
        {id: "documentStatus"},
        {id: "companySignatureName"},
        {id: "companySigDate"},
        {id: "employeeNumber"},
        {id: "employeeSignatureName"},
        {id: "employeeSigDate"}
    ]
    const TextFieldRow = () => {
        return (
            <>
                {TextFieldNames.map(Field => {
                    let isError = false
                    let label = ""
                    if(Field.id === "documentName") {
                        label = "Required"
                        if(documentNameErrorMessage !== '') isError = true
                    }
                    if(Field.id === "documentStatus") {
                        label = "Required"
                        if(documentStatusErrorMessage !== '') isError = true
                    }
                    if(Field.id === "companySigDate" || Field.id === "employeeSigDate") {
                        label = "2023-12-23T11:19:27.017Z"
                    }
                    return(<TableCell key={Field.id}><TextField id={Field.id} label={label} variant="filled"
                                                                error={isError} color={isError ? "error" : "primary"}/></TableCell>)
                })}
            </>
        )
    }
    const TableHeadRow = () => {
        return (
            <TableRow>
                {TextFieldNames.map(Field => <TableCell key={Field.id} sx={{fontWeight: 'bold'}}>{Field.id}</TableCell>)}
            </TableRow>
        )
    }
    return (
        <>
            <TableContainer component="form">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Fill your table
                </Typography>
                <Table sx={{minWidth: 600}} aria-label="simple table">
                    <TableHead>
                        <TableHeadRow/>
                    </TableHead>
                    <TableBody>
                        {dataRows ? dataRows.map((row: dataRow) => (
                            <TableRow key={row.id}>
                                {updateModeId !== row.id && <>
                                    <TableCell>{row.documentName}</TableCell>
                                    <TableCell>{row.documentType}</TableCell>
                                    <TableCell>{row.documentStatus}</TableCell>
                                    <TableCell>{row.companySignatureName}</TableCell>
                                    <TableCell>{row.companySigDate}</TableCell>
                                    <TableCell>{row.employeeNumber}</TableCell>
                                    <TableCell>{row.employeeSignatureName}</TableCell>
                                    <TableCell>{row.employeeSigDate}</TableCell>
                                    <TableCell>
                                        <BorderColorIcon id={row.id} className={s.button}
                                                         onClick={handleChangeUpdateMode}/>
                                        <DeleteIcon id={row.id} className={s.button} onClick={handleDeleteRaw}/>
                                    </TableCell>
                                </>}
                                {updateModeId === row.id && <>
                                    <TextFieldRow/>
                                    <TableCell>
                                        <CheckIcon id={row.id} className={s.button} onClick={handleInteractDataRow}/>
                                        <CloseIcon className={s.button} onClick={handleChangeUpdateMode}/>
                                    </TableCell>
                                </>}
                            </TableRow>
                        )) : null}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TextFieldRow/>
                            <TableCell><AddIcon sx={{marginTop: 1}} className={s.button}
                                                onClick={handleInteractDataRow}/></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {isFetched && <Preloader/>}
        </>
    )
}