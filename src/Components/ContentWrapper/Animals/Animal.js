import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAnimal, putAnimal} from "../../../redux/animals_reducer";

function Animal(props) {
    let dispatch = useDispatch()
    let openChangeWindow = () => {
        props.setIsPutAnimalShowing(true)
        dispatch(putAnimal(props.id))
    }

    return <div>
        id-{props.id}
        <br/>
        cage_id-{props.cage_id}
        <br/>
        name-{props.name}
        <br/>
        type-{props.type}
        <br/>
        cold_resistant-{props.cold_resistant ? "true" : "false"}
        {
            props.levels.update.indexOf(props.level)!=-1 &&
            <button onClick={() => openChangeWindow()}>change</button>
        }
        {
            props.levels.delete.indexOf(props.level)!=-1 &&
            <button onClick={() => dispatch(deleteAnimal(props.id))}>delete</button>
        }
    </div>
}

export default Animal;