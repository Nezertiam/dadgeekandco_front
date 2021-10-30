import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Requests from '../../../../middleware/Requests';

// Validation
import loginValidation from "./loginValidation";



const LoginForm = () => {

    // Local states
    const [complementValues, setComplementValues] = useState({
        showPassword: false,
        isValid: false
    });
    const dispatch = useDispatch();


    // Handlers
    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    const handleSubmit = async (values, setSubmitting) => {
        if (complementValues.isValid) {
            return;
        } else {
            setComplementValues({
                ...values,
                isValid: true
            });
            try {
                await Requests.login(values.email, values.password);
                const response = await Requests.getUser();
                dispatch({ type: "CONNECT", payload: response });
            } catch (err) {
                setSubmitting(false);
                setComplementValues({
                    ...values,
                    isValid: false
                });
            }
        }
    }



    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidation}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting);
                }}
            >
                {() => (
                    <StyledForm>
                        <div className="email-container">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" disabled={complementValues.isValid} placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="password-container">
                            <label htmlFor="password">Mot de passe</label>
                            <Field type="password" name="password" disabled={complementValues.isValid} placeholder="Mot de passe" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={complementValues.isValid}>
                            Valider
                        </button>
                    </StyledForm>
                )}
            </Formik>
        </>
    )
}


const StyledForm = styled(Form)`
    .email-container {
        padding-top: 1rem;
        position: relative;
    }
    .password-container {
        padding-top: 2rem;
        padding-bottom: 2.5rem;
        position: relative;
    }
    .error-message {
        position: absolute;
        color: #a50303a6;
        width: 100%;
        text-align: center;
        font-size: 0.8rem;
    }
    input {
        border-radius: 0px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    button {
        display: block;
        margin: 0 auto;
    }
`

export default LoginForm
