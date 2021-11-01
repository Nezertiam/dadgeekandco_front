import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

// Form
import LoginForm from './formik/LoginForm'



const LoginPage = () => {

    const isLogged = useSelector((state) => state.isLogged);

    if (isLogged) return <Redirect to="/" />

    return (
        <Container>
            <h1>Se connecter</h1>
            <h2>Le blog des Geemers</h2>
            <LoginForm />
            <hr />
            <div className="goto-register-message">
                <p>Pas encore inscrit&nbsp;?</p>
                <p>C'est pas par là... On peut pas encore s'inscrire :'(</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem 1rem 0.75rem;
    border-top: ${({ theme }) => theme.colors.container.border};
    border-left: ${({ theme }) => theme.colors.container.border};
    background-color: ${({ theme }) => theme.colors.container.background};
    backdrop-filter: blur(5px);
    min-height: 100%;
    h1 {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 2.5rem;
    }
    h2 {
        margin-bottom: 1rem;
    }
    hr {
        margin: 0 auto;
        margin-top: 2.5rem;
        margin-bottom: 1.5rem;
        border: none;
        border-top: 1px solid ${({ theme }) => theme.colors.hr};
        max-width: 225px;
    }
    .goto-register-message {
        margin-bottom: 2.5rem;
        p {
            text-align: center;
        }
    }
    @media screen and (min-width: 494px) {
        background-color: ${({ theme }) => theme.colors.container.backgroundglass};
    }
`

export default LoginPage;
