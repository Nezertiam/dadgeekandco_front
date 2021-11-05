import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'

const ArticleCard = (props) => {

    const { thumbnail, user, title, slug } = props.article;
    const [clicked, setClicked] = useState(false);

    if (clicked) {
        return <Redirect to={`/blog/article/read/${slug}`} />
    }

    return (
        <Card {...props} thumbnail={thumbnail} title={title}>
            <div className="article" onClick={() => setClicked(true)}>
                <div className="categories">

                </div>
                <div className="title">
                    <p>{title}</p>
                </div>
            </div>
            <div className="infos">
                <div>
                    <p title={"Ecrit par: " + user.name}>Par {user.name}</p>
                </div>
            </div>
        </Card>
    )
}


const Card = styled.article`

    width: 400px;
    max-width: 85vw;

    
    .article {
        cursor: pointer;
        border-radius: 7px 7px 0 0;
        border: ${({ theme }) => theme.colors.container.border};
        border-bottom: none;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        color: white;

        background: url(${props => props.thumbnail}) center center no-repeat;
        background-size: cover;

        width: 100%;
        height: 200px;
        max-height: 45vw;

        .title {
            background-color: #000000e2;
            padding: 0.5rem 1rem;
        }
    }
    .infos {
        text-align: right;
        padding-right: 0.75rem;
        border: ${({ theme }) => theme.colors.container.border};
        border-radius: 0 0 7px 7px;
        border-top: none;
        background: ${({ theme }) => theme.colors.container.background};
    }
`


export default ArticleCard
