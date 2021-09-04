import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {loginAPI} from "../../api/api";
import {React, useEffect, useState} from "react";
import {regUser} from "../../redux/me_reducer";
import {useDispatch} from "react-redux";

function Register(props) {
    let [logins, setLogins] = useState([])
    useEffect(() => {
        loginAPI.getLogins(setLogins)
    }, []);

    let dispatch = useDispatch()
    let onSubmit = (fields) => {
        dispatch(regUser(fields.login, fields.password))
    }
    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                login: Yup.string()
                    .notOneOf(logins, "login exists")
                    .required('login is required'),
                password: Yup.string()
                    .min(2, 'Password must be at least 2 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required')
            })}
            onSubmit={onSubmit}
            render={({errors, status, touched}) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="login">First Name</label>
                        <Field name="login" type="text"
                               className={'form-control' + (errors.login && touched.login ? ' is-invalid' : '')}/>
                        <ErrorMessage name="login" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password"
                               className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                        <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field name="confirmPassword" type="password"
                               className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Enter</button>
                    </div>
                </Form>
            )}
        />
    )
}

export default Register