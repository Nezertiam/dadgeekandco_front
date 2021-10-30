import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Copy from '../ui/Copy';

const Menu = () => {
    const open = useSelector((state) => state.isOpen);
    const dispatch = useDispatch();


    const disableScroll = () => {
        // Get the current page scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // if any scroll is attempted, set this to the previous value
        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }
    const enableScroll = () => {
        window.onscroll = () => { };
    }

    if (open) {
        disableScroll();
    } else {
        enableScroll();
    }

    return (
        <>
            <Burger className={open ? "open" : "closed"} onClick={() => { dispatch({ type: "TOGGLE_MENU" }) }}>
                <div></div>
                <div></div>
                <div></div>
            </Burger>
            <StyledMenu className={open ? "open" : "closed"}>
                <nav>
                    <ul>
                        <li className="title">Twitch</li>
                        <hr />
                        <li><a href="/">Mon live</a></li>
                        <li><a href="/">Le live des copains</a></li>


                        <li className="title separator">Le blog</li>
                        <hr />
                        <li><a href="/">Les dernières actus</a></li>
                        <li><a href="/">Recherche par catégorie</a></li>


                        <li className="title separator">Mon compte</li>
                        <hr />
                        <li><Link to="/connexion">Connexion</Link></li>
                    </ul>
                </nav>
                <div className="copyright">
                    <Copy />
                </div>
            </StyledMenu>
        </>
    )
}



const StyledMenu = styled.div`
    background-color: ${({ theme }) => theme.colors.navbar.backgroundAlt};

    position: fixed;
    top: 65px;
    right: 0;
    left: 0;
    bottom: 0;

    text-align: center;
    overflow: hidden;

    height: 0%;
    transition: height 0.5s;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-bottom: 5px;

    nav {
        padding-top: 2rem;
        ul {
            margin: 10px 0;
            li {
                &.title {
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 3px;
                    &.separator {
                        margin-top: 3rem;
                    }
                }
                &:not(.title) {
                    padding-bottom: 10px;
                    &>* {
                        text-decoration: none;
                        font-weight: 400;
                    }
                }
            }
            hr {
                border: none;
                border-top: 1px solid ${({ theme }) => theme.colors.hr};
                max-width: 90px;
                margin: 12px auto 20px;
            }
        }
    }
    &.open {
        height: calc(100vh - 65px);
    }
`



const Burger = styled.div`
    width: 2.3rem;
    height: 2.75rem;
    margin: auto 0.75rem auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &>:nth-child(1), &>:nth-child(2), &>:nth-child(3) {
        background-color: white;
        width: 100%;
        height: 5px;
        transition: transform 0.4s;
    }
    &>:nth-child(2) {
        margin-block: 0.2rem;
        background-color: transparent;
    }

    &.open {
        &>:nth-child(1), &>:nth-child(2), &>:nth-child(3) {
            transform-origin: center;
        }
        &>:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        &>:nth-child(2) {
            margin-block: 0.2rem;
            background-color: transparent;
        }
        &>:nth-child(3) {
            transform:  translateY(-8px) rotate(-45deg);
        }
    }
`

export default Menu