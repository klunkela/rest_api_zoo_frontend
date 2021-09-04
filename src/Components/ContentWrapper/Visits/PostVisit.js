import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {postVisit} from "../../../redux/visits_reducer";
import {useDispatch} from "react-redux";

function PostVisit(props) {
    let dispatch = useDispatch()
    let postVisit_ = (ticket_price, worker_id) => {
        dispatch(postVisit(ticket_price, worker_id))
    }

    return (
        <div>
            <Formik
                initialValues={{
                    ticket_price: 0,
                    worker_id: '',
                }}
                onSubmit={(values) => postVisit_(values.ticket_price, values.worker_id)}
                render={({}) => (
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
                            <button type="submit" className="btn btn-primary mr-2">POST</button>
                        </div>
                    </Form>
                )}
            />

        </div>
    );
}

export default PostVisit;