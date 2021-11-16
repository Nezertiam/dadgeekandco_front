import React from 'react'
import styled from 'styled-components'

const Button = (props) => {

    return (
        <Container {...props} onClick={() => { }}>
            <div className="button">
                <button onClick={props.onClick} className="btn-btn">
                    <span>
                        {props.children}
                    </span>
                </button>
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
        
        .btn-btn {
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            background: none;
            font-weight: 400;
            font-size: 1rem;
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
        }
    }
`


export default Button;
