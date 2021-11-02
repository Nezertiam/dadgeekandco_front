import React from 'react'
import styled from 'styled-components'

const ArticleCard = (props) => {

    const { thumbnail, user, title } = props.article;

    return (
        <Card {...props} thumbnail={thumbnail}>
            <div className="article">
                <div className="categories">

                </div>
                <div className="title">
                    <p>{title}</p>
                </div>
            </div>
            <div className="infos">
                <div>
                    <p>Par {user.name}</p>
                </div>
            </div>
        </Card>
    )
}


const Card = styled.div`

    width: 400px;
    max-width: 85vw;

    .article {
        border-radius: 10px 10px 0 0;
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
        border-radius: 0 0 10px 10px;
        border-top: none;
    }
`


export default ArticleCard
