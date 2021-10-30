import React from 'react'
import styled from 'styled-components'

const Layout = ({ children }) => {
    return (
        <>
            <header className="layout-header">
                Header
            </header>
            <main className="layout-main-content">
                <Background className="background" />
                {children}
            </main>
            <footer className="layout-footer">
                Footer
            </footer>
        </>
    )
}


const Background = styled.div`
    z-index: -2;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    /* filter: blur(10px); */
    /* background: rgb(238,174,202);
    background: linear-gradient(128deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); */
`


export default Layout
