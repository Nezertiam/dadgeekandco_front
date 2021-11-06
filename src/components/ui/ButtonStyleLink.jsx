import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronRight } from '../../assets'

const ButtonStyleLink = (props) => {

    const to = props.to ?? "/";

    return (
        <Container {...props}>
            <div className="button">
                <Link to={to}>
                    <span>
                        {props.children}
                    </span>
                    <ChevronRight width="30px" height="30px" className="chevron" />
                </Link>
            </div>
        </Container>
    )
}


const Container = styled.div`
    
    display: flex;
    justify-content: ${({ position }) => position};
    
    .button {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.secondary};

        border-radius: 40px;
        overflow: hidden;
        
        display: flex;
        align-items: center;
        
        transition: background-color 0.2s;
        
        a {
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            span {
                padding-right: 0.5rem;
            }
            * {
                color: ${({ theme }) => theme.colors.secondary};
                transition: color 0.2s;
            }
            &:hover {
                text-decoration: none;
            }
        }
        &:hover {
            background-color: ${({ theme }) => theme.colors.secondary};
            * {
                color: white;
            }
            .chevron {
                animation-name: spin;
                animation-duration: 750ms;
            }
        }
    }
    

    @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
`


export default ButtonStyleLink
