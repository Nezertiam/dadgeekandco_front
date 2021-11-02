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
        isValid: false,
        errors: []
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

            let errors = [];

            const loginResponse = await Requests.login(values.email, values.password);
            if (loginResponse.code === 200) {
                const profileResponse = await Requests.getUser();
                if (profileResponse.code === 200) {
                    dispatch({ type: "CONNECT", payload: profileResponse.data });
                } else {
                    errors.push(profileResponse.message);
                }
            } else {
                errors.push(loginResponse.message);
            }

            if (errors.length > 0) {
                setSubmitting(false);
                setComplementValues({
                    ...values,
                    isValid: false,
                    errors
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
                        <div className="submit-container">
                            <button type="submit" disabled={complementValues.isValid}>
                                Valider
                            </button>
                            {
                                (complementValues.errors && complementValues.errors.length > 0) &&
                                complementValues.errors.map((error, index) => {
                                    return <div className="error-message" key={index}>{error}</div>
                                })
                            }
                        </div>
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
    .password-container{
        padding-top: 2rem;
        padding-bottom: 2.5rem;
        position: relative;
    }
    .submit-container {
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
        margin: 0 auto 0.5rem;
    }
`

export default LoginForm
