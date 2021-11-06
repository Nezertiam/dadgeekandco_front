import React from 'react'
import styled from 'styled-components'
import { Twitch, Twitter, Youtube } from '../../assets'
import Copy from '../ui/Copy'

const Footer = () => {
    return (
        <StyledFooter className="layout-footer">
            <div className="footer-container">
                <p className="socials-heading">Suis l'aventure sur les reseaux !</p>
                <ul className="socials-container">
                    <li className="socials">
                        <a href="https://www.twitch.tv/dadgeek_and_co" target="_blank" rel="noreferrer">
                            <Twitch />
                        </a>
                    </li>
                    {/* <li className="socials">
                        <a href="/" target="_blank" rel="noreferrer">
                            <Discord />
                        </a>
                    </li> */}
                    <li className="socials">
                        <a href="https://twitter.com/dadgeek2" target="_blank" rel="noreferrer">
                            <Twitter />
                        </a>
                    </li>
                    <li className="socials">
                        <a href="https://www.youtube.com/channel/UCCa1oDtfNevea_yHLjm1isQ" target="_blank" rel="noreferrer">
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
    height: 1px; /* CSS Trick : The footer won't be bigger than needed with that */

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
