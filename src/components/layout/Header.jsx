import React from 'react'
import styled from 'styled-components'
import Menu from './Menu'

const Header = () => {
    return (
        <StyledHeader>
            <div className="left-container">
                <div className="logo">
                    DadGeek And Logo.
                </div>
            </div>
            <div className="middle-container">

            </div>
            <div className="right-container">
                <Menu />
            </div>
        </StyledHeader>
    )
}


const StyledHeader = styled.header`
    height: 65px;
    background-color: ${({ theme }) => theme.colors.navbar.background};
    color: white;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 5;

    .middle-container {
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .right-container {
        text-align: right;
        display: flex;
        justify-content: right;
    }
`


export default Header
