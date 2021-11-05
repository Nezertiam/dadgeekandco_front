import React from 'react'
import styled from 'styled-components'

const NothingToShow = (props) => {
    return (
        <Container>
            <p>
                {props.message}
            </p>
        </Container>
    )
}


const Container = styled.div`

    padding: 1rem;

    p {
        color: ${({ theme }) => theme.colors.text};
        text-align: center;
    }
`


export default NothingToShow
