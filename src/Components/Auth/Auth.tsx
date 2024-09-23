import * as React from 'react';
import ms from '../../App.module.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {loginUser} from "../../Redux/loginReduser";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../Redux/redux-store";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {selectIsFetchedL} from "../../Redux/loginSelectors";
import Preloader from "../../Common/Preloader";

export const LoginBox = () => {
    const dispatch: AppDispatchType = useDispatch()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)
    const [showPassword, setShowPassword] = React.useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let isFetched = useSelector(selectIsFetchedL)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handleChangeUsername = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isValid) dispatch(loginUser(username, password))
    }
    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        setIsValid(true)
        if (!username.value || !/^user+[0-9]{1,4}$/.test(username.value)) {
            setUsernameErrorMessage('Please enter a valid username.')
            setIsValid(false)
        } else {
            setUsernameErrorMessage('')
        }
        if (!password.value || !/^password$/.test(password.value)) {
            setPasswordErrorMessage('Please enter a valid password.')
            setIsValid(false)
        } else {
            setPasswordErrorMessage('')
        }
    }
    const card = (
            <CardContent>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign in
                </Typography>
                <div>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            type={'text'}
                            onChange={handleChangeUsername}
                            error={usernameErrorMessage !== ''}
                            color={usernameErrorMessage !== '' ? 'error' : 'primary'}
                            label="Username"
                        />
                        <FormHelperText>{usernameErrorMessage}</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChangePassword}
                            error={passwordErrorMessage !== ''}
                            color={passwordErrorMessage !== '' ? 'error' : 'primary'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText>{passwordErrorMessage}</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <Button type={"submit"} sx={{m: 1, width: '25ch'}} variant="contained" onClick={validateInputs}>login</Button>
                    {isFetched && <Preloader/>}
                </div>
            </CardContent>
    )
    return (
        <Box className={ms.centerElement}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                marginTop: 25,
                paddingTop: 5,
                maxWidth: 400
            }}
        >
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}