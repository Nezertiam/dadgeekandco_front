import React from 'react'
import styled from 'styled-components'

const ArticleBadge = (props) => {

    const { title } = props.category;

    return (
        <StyledBadge {...props}>
            {title}
        </StyledBadge>
    )
}

const StyledBadge = styled.span`
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 0.25rem 1rem;
    border-radius: 10px;
`

export default ArticleBadge
