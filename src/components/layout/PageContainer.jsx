import React from 'react'
import styled from 'styled-components'

const PageContainer = (props) => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    padding: 1rem;
    padding-top: 2rem;
    height: 100%;
    max-width: 1128px;
    margin: 0 auto;
`

export default PageContainer
