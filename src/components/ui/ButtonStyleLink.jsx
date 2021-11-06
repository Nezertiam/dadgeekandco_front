import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronRight } from '../../assets'

const ButtonStyleLink = (props) => {

    const to = props.to ?? "/";
    let history = useHistory();

    return (
        <ButtonLike {...props}>
            <div className="container">
                <Link to={to}>
                    {props.children}
                </Link>
                <ChevronRight width="30px" height="30px" className="chevron" />
            </div>
        </ButtonLike>
    )
}


const ButtonLike = styled.div`
    
    display: flex;
    justify-content: ${({ position }) => position};
    cursor: pointer;
    
    .container {
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.secondary};

        border-radius: 40px;
        padding: 1rem 2rem;

        display: flex;
        align-items: center;

        transition: background-color 0.2s;
        
        * {
            color: ${({ theme }) => theme.colors.secondary};
            transition: color 0.2s;
        }
        a {
            padding-right: 1rem;
            text-decoration: none;
        }
    }
    
    .container:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        * {
            color: white;
        }
        .chevron {
            animation-name: spin;
            animation-duration: 750ms;
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
