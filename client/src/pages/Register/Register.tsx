import { Form, Formik } from "formik";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register } from "../../redux/action-creators/auth.action-creator";
import { Button, ModalSpinner } from "../../ui";

interface errorProps {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

const Register:React.FC = () => {

    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth);

    const initialValues = useMemo(() => ({
        email: '', password: '', firstName: '', lastName: ''
    }), []);

    return (
        <div className="auth">
            <Formik
                initialValues={initialValues}
                validate={values => {
                    const errors:errorProps = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.firstName) errors.firstName = 'Required';
                    if (!values.lastName) errors.lastName = 'Required';
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    dispatch(register(values.email, values.password, values.firstName + ' ' + values.lastName));
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 400);
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                <Form className="auth__form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className={`auth__input ${errors.email && touched.email ? 'auth__input_error' : ''}`}>
                        <input type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email} 
                            placeholder="Email..." />
                        <div className="img-container">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 3.3585V12H16V3.35849L8 8.3585L0 3.3585Z" fill="#000000"/>
                                <path d="M16 1V0H0V1L8 6L16 1Z" fill="#000000"/>
                            </svg>
                        </div>
                        <p className="auth__error">
                            {errors.email && touched.email && errors.email}
                        </p>
                    </div>
                    <div className={`auth__input ${errors.firstName && touched.firstName ? 'auth__input_error' : ''}`}>
                        <input type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName} 
                            placeholder="First name..." />
                        <div className="img-container">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6Z" fill="#000000"/>
                            <path d="M12 11C12 9.34315 10.6569 8 9 8H3C1.34315 8 0 9.34315 0 11V14H12V11Z" fill="#000000"/>
                        </svg>
                        </div>
                        <p className="auth__error">
                            {errors.firstName && touched.firstName && errors.firstName}
                        </p>
                    </div>
                    <div className={`auth__input ${errors.lastName && touched.lastName ? 'auth__input_error' : ''}`}>
                        <input type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName} 
                            placeholder="Last name..." />
                        <div className="img-container">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6Z" fill="#000000"/>
                            <path d="M12 11C12 9.34315 10.6569 8 9 8H3C1.34315 8 0 9.34315 0 11V14H12V11Z" fill="#000000"/>
                        </svg>
                        </div>
                        <p className="auth__error">
                            {errors.lastName && touched.lastName && errors.lastName}
                        </p>
                    </div>
                    <div className={`auth__input auth__password ${errors.password && touched.password ? 'auth__input_error' : ''}`}>
                        <input type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} 
                            placeholder="Password" />
                        <div className="img-container">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2 6V4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4V6H12V16H0V6H2ZM4 4C4 2.89543 4.89543 2 6 2C7.10457 2 8 2.89543 8 4V6H4V4ZM5 13V9H7V13H5Z" fill="#000000"/>
                            </svg>
                        </div>
                        <div className="img-container end click">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 6L3.07945 2.30466C4.29638 0.844341 6.09909 0 8 0C9.90091 0 11.7036 0.844343 12.9206 2.30466L16 6L12.9206 9.69534C11.7036 11.1557 9.90091 12 8 12C6.09909 12 4.29638 11.1557 3.07945 9.69534L0 6ZM8 9C9.65685 9 11 7.65685 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9Z" fill="#000000"/>
                            </svg>
                        </div>
                        <p className="auth__error">
                            {errors.password && touched.password && errors.password}
                        </p>
                    </div>
                    <Button type="submit" 
                        className="auth__btn"
                        disabled={isSubmitting}>register</Button>
                    <span>Don't have an account? <Link to='/login'>login</Link></span>
                </Form>
                )}
            </Formik>
            {auth.isLoading && (
                <ModalSpinner />
            )}
        </div>
    );
}

export default Register;