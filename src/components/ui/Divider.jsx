import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

const Divider = ({ fullwidth = false, color = "primary" }) => {

    const theme = useSelector((state) => state.theme);

    if (color) {
        switch (color) {
            case "secondary":
                color = theme.secondary;
                break;
            case "primary":
                color = theme.primary;
                break;
            default:
                color = null;
        }
    }

    return (
        <StyledDivider color={color} fullwidth={fullwidth} />
    )
}


const StyledDivider = styled.hr`
    border-top: 1px solid ${({ theme, color }) => color ?? theme.colors.primary};
    max-width: ${({ fullwidth }) => fullwidth ? "100%" : "200px"};
    margin: 1rem auto;
    padding: 0 1.5rem;
`

export default Divider
