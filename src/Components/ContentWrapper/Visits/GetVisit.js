import React from 'react';
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getVisitSelector} from "../../../redux/visits_selectors";
import {setGetVisit} from "../../../redux/visits_reducer";
import Visit from "./Visit";

function GetVisit(props) {
    let dispatch = useDispatch()

    let getVisit_ = (visit_id) => {
        if (visit_id) dispatch(setGetVisit(visit_id))
    }
    let visitJSON = useSelector(getVisitSelector)
    let visit;
    if (visitJSON) visit = JSON.parse(visitJSON)

    console.log(visit);
    return (
        <div>
            <Formik
                initialValues={{visit_id: ''}}
                onSubmit={(values) => getVisit_(values.visit_id)}
                render={({}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="visit_id">visit_id</label>
                            <Field name="visit_id" type="text"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">get visit info</button>
                        </div>
                    </Form>
                )}
            />
            {visit && <Visit {...visit} setIsPutVisitShowing={props.setIsPutVisitShowing}
                             level={props.level} levels={props.levels}/>}
        </div>
    );
}

export default GetVisit;