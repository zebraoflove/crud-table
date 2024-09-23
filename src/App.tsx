import ms from './App.module.css';
import * as React from "react";
import {Provider, useSelector} from "react-redux";
import {LoginBox} from "./Components/Auth/Auth";
import {selectIsAuth} from "./Redux/loginSelectors";
import {TableBox} from "./Components/Table/Table";
import store from "./Redux/redux-store";
const App: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    return (
        <div className={ms.App}>
            {!isAuth && <LoginBox/>}
            {isAuth && <TableBox/>}
        </div>
    )
}
const MainApp = () => {
    return <Provider store={store}>
        <App/>
    </Provider>
}
export default MainApp