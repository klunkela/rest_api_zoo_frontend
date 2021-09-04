import React from 'react';
import header from './../../images/headerzoo.jpg';
import s from './Content.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/me_reducer";
import {getUserDataSelector} from "../../redux/me_selectors";
import {logout_animals} from "../../redux/animals_reducer";
import {logout_visits} from "../../redux/visits_reducer";

function Header(props) {
    const dispatch = useDispatch()
    let logout_ = () => {
        dispatch(logout())
        dispatch(logout_visits())
        dispatch(logout_animals())
    }

    let user = useSelector(getUserDataSelector)

    return (
        <div className={s.header}>
            <img className={s.logo} src={header}/>

            <div className={s.header_menu}>
                <button onClick={() => logout_()}>LOGOUT</button>
            </div>

           login -  {user.login}
           <br/>
           id -  {user.id}
            <br/>
            access_level - {user.access_level}

        </div>
    );
}

export default Header;