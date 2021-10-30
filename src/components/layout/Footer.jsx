import React from 'react'
import styled from 'styled-components'
import { Twitch, Discord, Twitter, Youtube } from '../../assets'
import Copy from '../ui/Copy'

const Footer = () => {
    return (
        <StyledFooter className="layout-footer">
            <div className="footer-container">
                <p className="socials-heading">Suis l'aventure sur les reseaux !</p>
                <ul className="socials-container">
                    <li className="socials">
                        <a href="/">
                            <Twitch />
                        </a>
                    </li>
                    <li className="socials">
                        <a href="/">
                            <Discord />
                        </a>
                    </li>
                    <li className="socials">
                        <a href="/">
                            <Twitter />
                        </a>
                    </li>
                    <li className="socials">
                        <a href="/">
                            <Youtube />
                        </a>
                    </li>
                </ul>
                <Copy />
            </div>
        </StyledFooter>
    )
}


const StyledFooter = styled.footer`
    display: table-row;
    background-color: ${({ theme }) => theme.colors.footer.background};
    color: ${({ theme }) => theme.colors.footer.text};
    height: 1px; /* CSS Trick : The footer won't be bigger than needed */

    .footer-container {
        padding: 2rem 1rem 0;
        p {
            padding-bottom: 1rem;
            &.socials-heading {
                text-align: center;
                padding-bottom: 1.5rem;
            }
        }
    
        .socials-container {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            .socials {
                width: 35px;
                margin: 0 1rem;
            }
        }
    }

`

export default Footer
