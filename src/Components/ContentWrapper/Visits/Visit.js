import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {deleteVisit, putVisit, setGetVisit} from "../../../redux/visits_reducer";
import {deleteAnimal} from "../../../redux/animals_reducer";

function Visit(props) {
    let dispatch = useDispatch()
    let openChangeWindow = () => {
        props.setIsPutVisitShowing(true)
        dispatch(putVisit(props.id))
    }
    return <div>
        id-{props.id}
        <br/>
        ticket_price-{props.ticket_price}
        <br/>
        worker_id-{props.worker_id}
        {
            props.levels.update.indexOf(props.level) != -1 &&
            <button onClick={() => openChangeWindow()}>change</button>}
        {
            props.levels.delete.indexOf(props.level) != -1 &&
            <button onClick={() => dispatch(deleteVisit(props.id))}>delete</button>
        }

    </div>
}


export default Visit;