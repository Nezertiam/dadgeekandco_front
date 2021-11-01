import React from 'react'
import styled from 'styled-components'

const Copy = () => {

    const year = new Date().getFullYear();

    return (
        <StyledCopy>
            <p className="copy">&copy;DadGeek {year}</p>
        </StyledCopy>
    )
}


const StyledCopy = styled.div`
    .copy {
        font-size: 0.8rem;
        text-align: center;
    }
`

export default Copy
