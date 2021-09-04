import React from 'react';

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {putAnimal, putAnimalPush} from "../../../redux/animals_reducer";

function PutAnimal(props) {

    let dispatch = useDispatch()
    let animal = props.putAnimal
    let putAnimal_ = (id, cage_id, type, name, cold_resistant) => {
        dispatch(putAnimalPush(id, cage_id, type, name, cold_resistant))
    }
    return (
        <div>
            {animal &&
            <div>
                <Formik enableReinitialize
                        initialValues={{
                            cage_id: animal.cage_id,
                            type: animal.type,
                            name: animal.name,
                            cold_resistant: animal.cold_resistant
                        }}
                        validationSchema={Yup.object().shape({
                            cage_id: Yup.number()
                                .min(1, 'must be')
                        })}
                        onSubmit={(values) => putAnimal_(animal.id, values.cage_id, values.type, values.name, values.cold_resistant)}
                        render={({values, errors, touched}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="cage_id">cage_id</label>
                                    <Field name="cage_id" type="text"
                                           className={'form-control' + (errors.login && touched.login ? ' is-invalid' : '')}
                                    />
                                    <ErrorMessage name="login" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">type</label>
                                    <Field name="type" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">name</label>
                                    <Field name="name" type="text"/>
                                </div>
                                <label>
                                    <Field type="checkbox" name="cold_resistant"/>
                                    {`${values.cold_resistant}`}
                                </label>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">PUT</button>
                                </div>
                            </Form>
                        )}
                />

            </div>
            }

        </div>
    );
}

export default PutAnimal;