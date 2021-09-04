import React from 'react';
import {NavLink} from "react-router-dom";
import {getUserDataSelector, getUserIdSelector} from "../../redux/me_selectors";
import {useDispatch, useSelector} from "react-redux";
import {getAccessLevelsAnimalsSelector, getAccessLevelsSelector} from "../../redux/animals_selectors";
import {setAccessLevels, setAccessLevelsAnimals} from "../../redux/animals_reducer";
import GetAnimals from "./Animals/GetAnimals";
import {getAccessLevelsVisitsSelector} from "../../redux/visits_selectors";
import {setAccessLevelsVisits} from "../../redux/visits_reducer";

function Menu(props) {
    let dispatch = useDispatch()

    let level = useSelector(getUserDataSelector).access_level

    let levelsJSONAnimals = useSelector(getAccessLevelsAnimalsSelector)
    dispatch(setAccessLevelsAnimals())
    let levelsAnimals;
    if (levelsJSONAnimals) levelsAnimals = JSON.parse(levelsJSONAnimals)

    let levelsJSONVisits = useSelector(getAccessLevelsVisitsSelector)
    dispatch(setAccessLevelsVisits())
    let levelsVisits;
    if (levelsJSONVisits) levelsVisits = JSON.parse(levelsJSONVisits)

    return (
        <div>

            {
                levelsAnimals &&
                <div><NavLink to='/animals'>animals</NavLink></div>
            }
            {
                levelsVisits &&
                <div><NavLink to='/visits'>visits</NavLink></div>
            }
        </div>
    );
}

export default Menu;