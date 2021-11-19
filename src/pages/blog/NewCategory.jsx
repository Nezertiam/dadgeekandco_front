import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import styled from 'styled-components'
import PageContainer from '../../components/layout/PageContainer'
import Requests from '../../middleware/Requests';
import { useDispatch } from 'react-redux';

const CategorySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Trop court')
        .max(15, 'Trop long!')
        .required('Champs requis'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Champs requis')
});

const NewCategory = ({ close, popup }) => {

    const dispatch = useDispatch();
    const [submit, setSubmit] = useState(false);
    const [resErrors, setResErrors] = useState([]);

    const handleSubmit = async (values) => {
        const response = await Requests.postCategories(values);
        if (response.code === 201) {
            dispatch({ type: "NEW_CATEGORY" });
        } else {
            setSubmit(false);
            setResErrors(response.errors)
        }
    }

    return (
        <NewCat>
            <h2 className="title">Ajouter une nouvelle catégorie</h2>
            <div>
                <Formik
                    initialValues={{
                        title: '',
                        description: ''
                    }}
                    validationSchema={CategorySchema}
                    onSubmit={values => {
                        setSubmit(true);
                        handleSubmit(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="title" placeholder="Titre" />
                            {errors.title && touched.title ? (
                                <div className="error-message">{errors.title}</div>
                            ) : null}
                            <Field name="description" placeholder="Description" className="description" />
                            {errors.description && touched.description ? (
                                <div>{errors.description}</div>
                            ) : null}
                            <div className="button-container">
                                {
                                    popup &&
                                    <button className="cancel" onClick={close}>Annuler</button>
                                }
                                <button type="submit" disabled={submit}>Ajouter</button>
                            </div>
                            {
                                resErrors.map((error, index) => {
                                    return <div className="error-message" key={index}>{error.message}</div>
                                })
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </NewCat>
    )
}

export const NewCategoryPopup = ({ close }) => {
    return (
        <Popup>
            <div className="paper">
                <NewCategory close={close} popup={true} />
            </div>
        </Popup>
    )
}

export const NewCategoryPage = () => {
    return (
        <PageContainer>
            <NewCategory />
        </PageContainer>
    )
}

const Popup = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: #0000006f;

    .paper {
        background-color: white;
        max-width: 600px;
        margin: 0 auto;
        margin-top: 2rem;
        padding: 2rem 1rem;
    }
    
    `

const NewCat = styled.div`
    .button-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    .error-message {
        position: absolute;
        color: #a50303a6;
        text-align: center;
        font-size: 0.8rem;
    }
    .description {
        margin-top: 1.75rem;
        margin-bottom: 1.75rem;
    }
`