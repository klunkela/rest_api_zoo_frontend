import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isAuth_} from "./redux/me_selectors";
import Login from "./Components/Login/Login";
import ContentWrapper from "./Components/Login/ContentWrapper";
import {Redirect, Route} from "react-router-dom";
import { setMeToken} from "./redux/me_reducer";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function App() {
    const isAuth = useSelector(isAuth_)

    let token = getCookie("token")
    console.log(token);
    const dispatch = useDispatch()
    dispatch(setMeToken(token))

    return (
        <div>
            {
                isAuth ?
                    <ContentWrapper/>
                    :
                    <Redirect to={'/login'}/>
            }

            <Route path="/login" render={() => <Login/>}/>

        </div>
    );
}

export default App;
