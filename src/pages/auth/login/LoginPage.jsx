import React from 'react'
import styled from 'styled-components'

// Form
import LoginForm from './formik/LoginForm'



const LoginPage = () => {

    return (
        <Container>
            <div className="glass-effect"></div>
            <h1>Se connecter</h1>
            <h2>Le blog des Geemers</h2>
            <LoginForm />
            <hr />
            <div>
                <p>Pas encore inscrit&nbsp;?</p>
                <p>C'est pas par là... On peut pas encore s'inscrire :'(</p>
                <p className="credits">&copy;DadGeek 2021</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem 2.5rem 0.75rem;
    margin-top: 2rem;
    border-radius: 10px;
    border: ${({ theme }) => theme.colors.container.border};
    overflow: hidden;
    position: relative;
    
    .glass-effect {
        background-color: ${({ theme }) => theme.colors.container.backgroundglass};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(1rem);
        
    }
    
    h1 {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 3.5rem;
    }
    hr {
        margin-top: 2.5rem;
        margin-bottom: 1.5rem;
        border-top: 1px solid #ffffffd3;
    }
    p {
        text-align: center;
        &.credits {
            margin-top: 2.5rem;
            font-size: 0.8rem;
        }
    }
`

export default LoginPage;
