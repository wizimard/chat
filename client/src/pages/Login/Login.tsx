import { Form, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../redux/action-creators/auth.action-creator";
import { Button, ModalSpinner } from "../../ui";

interface errorProps {
    email?: string;
    password?: string;
}

const Login:React.FC = () => {

    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth);

    const initialValues = useMemo(() => ({
        email: '', password: ''
    }), []);

    const [passwordType, setPasswordType] = useState('password');
    
    const handleChangePasswordType = useCallback(() => {
        setPasswordType(prev => prev === 'password' ? 'text' : 'password');
    }, []);

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
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    dispatch(login(values.email, values.password));
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
                    <h1>Login</h1>
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
                    <div className={`auth__input auth__password ${errors.password && touched.password ? 'auth__input_error' : ''}`}>
                        <input type={passwordType}
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
                        <div className="img-container end click" onClick={handleChangePasswordType}>
                            {passwordType === 'password' ? (
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 6L3.07945 2.30466C4.29638 0.844341 6.09909 0 8 0C9.90091 0 11.7036 0.844343 12.9206 2.30466L16 6L12.9206 9.69534C11.7036 11.1557 9.90091 12 8 12C6.09909 12 4.29638 11.1557 3.07945 9.69534L0 6ZM8 9C9.65685 9 11 7.65685 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9Z" fill="#000000"/>
                            </svg>
                            ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 16H13L10.8368 13.3376C9.96488 13.7682 8.99592 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8L3.07945 4.30466C3.14989 4.22013 3.22229 4.13767 3.29656 4.05731L0 0H3L16 16ZM8.84053 10.8807L5.35254 6.58774C5.12755 7.00862 5 7.48941 5 8C5 9.65685 6.34315 11 8 11C8.29178 11 8.57383 10.9583 8.84053 10.8807Z" fill="#000000"/>
                                <path d="M16 8L14.2278 10.1266L7.63351 2.01048C7.75518 2.00351 7.87739 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8Z" fill="#000000"/>
                            </svg>
                            )}
                        </div>
                        <p className="auth__error">
                            {errors.password && touched.password && errors.password}
                        </p>
                    </div>
                    <Button text="login" 
                        type="submit" 
                        additionalClass="auth__btn"
                        disabled={isSubmitting} />
                    <span>Already have an account? <Link to='/register'>register</Link></span>
                </Form>
                )}
            </Formik>
            {auth.isLoading && (
                <ModalSpinner />
            )}
        </div>
    );
}

export default Login;