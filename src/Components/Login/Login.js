import {useState} from "react";
import React from "react";
import LoginForm from "./LoginForm";
import Register from "./Register";
import ReactModal from 'react-modal';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAuth_} from "../../redux/me_selectors";

function Login(props) {
    let [isNewAcc, setIsNewAcc] = useState(false)

    const isAuth = useSelector(isAuth_)
    let closeModal = () => {
        setIsNewAcc(false)
    };
    return (
        <div>
            {isAuth && <Redirect to={'/'}/>}
            <button onClick={() => setIsNewAcc(true)}>Create new account</button>
            <LoginForm/>

            <ReactModal ariaHideApp={false} isOpen={isNewAcc} onRequestClose={closeModal}>
                <Register/>
            </ReactModal>
        </div>
    )
}

export default Login
