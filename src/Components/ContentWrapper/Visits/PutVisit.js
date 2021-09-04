import React from 'react';

import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {putVisitPush} from "../../../redux/visits_reducer";

function PutVisit(props) {

    let dispatch = useDispatch()
    let visit = props.putVisit
    let putVisit_ = (ticket_price, worker_id) => {
        dispatch(putVisitPush(ticket_price, worker_id))
    }
    return (
        <div>
            {visit &&
            <div>
                <Formik enableReinitialize
                        initialValues={{
                            ticket_price: visit.ticket_price,
                            worker_id: visit.worker_id
                        }}
                        onSubmit={(values) => putVisit_(visit.id, values.ticket_price, values.worker_id)}
                        render={({values, errors, touched}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="ticket_price">ticket_price</label>
                                    <Field name="ticket_price" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="worker_id">worker_id</label>
                                    <Field name="worker_id" type="text"/>
                                </div>
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

export default PutVisit;