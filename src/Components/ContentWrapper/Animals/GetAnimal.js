import React from 'react';
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getAnimalSelector} from "../../../redux/animals_selectors";
import {setGetAnimal} from "../../../redux/animals_reducer";
import Animal from "./Animal";

let GetAnimalData = (props) => {
    return <div>
        id - {props.animal.id}
        <br/>
        cage_id - {props.animal.cage_id}
        <br/>
        type - {props.animal.type}
        <br/>
        name - {props.animal.name}
        <br/>
        coldR - {props.animal.cold_resistant}
    </div>
}

function GetAnimal(props) {
    let dispatch = useDispatch()

    let getAnimal_ = (animal_id) => {
        dispatch(setGetAnimal(animal_id))
    }
    let animalJSON = useSelector(getAnimalSelector)
    let animal;
    if (animalJSON) animal = JSON.parse(animalJSON)
    return (
        <div>
            <Formik
                initialValues={{animal_id: ''}}
                onSubmit={(values) => getAnimal_(values.animal_id)}
                render={({}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="animal_id">animal_id</label>
                            <Field name="animal_id" type="text"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">get animal info</button>
                        </div>
                    </Form>
                )}
            />
            {animal && <Animal {...animal} setIsPutAnimalShowing={props.setIsPutAnimalShowing}
                               levels={props.levels} level={props.level}/>}
        </div>
    );
}

export default GetAnimal;