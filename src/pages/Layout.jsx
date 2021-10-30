import React from 'react'
import styled from 'styled-components'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'



const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Main className="layout-main-content">
                <Background className="background" />
                {children}
            </Main>
            <Footer />
        </>
    )
}

const Main = styled.main`
    display: table-row;
`

const Background = styled.div`
    z-index: -2;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 65px;
    overflow: hidden;
    background-image: ${`url(${process.env.PUBLIC_URL}/assets/backgrounds/Overlay_Gameplay.png)`};
    background-size: cover;
    background-position: top right;
    
`


export default Layout
