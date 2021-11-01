import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'



const Layout = ({ children }) => {

    const theme = useSelector((state) => state.theme);
    const background = theme.background.image;
    const position = theme.background.position;
    const url = `url("${process.env.PUBLIC_URL}/assets/backgrounds/${background}")`


    return (
        <>
            <Header />
            <Main className="layout-main-content">
                <Background className="background" url={url} position={position} />
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
    background-image: ${props => props.url};
    background-size: cover;
    background-position: ${props => props.position};
`


export default Layout
