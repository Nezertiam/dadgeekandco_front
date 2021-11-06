import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import ArticleBadge from './ArticleBadge';

const ArticleCard = (props) => {

    const { thumbnail, user, title, slug, updatedAt, createdAt, categories } = props.article;
    const updateDate = (props.chooseUpdateDate && props.chooseUpdateDate === true) ?? false;

    const date = new Date(updateDate ? updatedAt : createdAt).toLocaleDateString();

    return (
        <Card {...props} thumbnail={thumbnail} title={title}>
            <Link to={`/blog/article/read/${slug}`} className="article">
                <div className="categories">
                    {
                        categories.length > 0 &&
                        categories.map((category, index) => {
                            return <ArticleBadge category={category} key={index} />
                        })
                    }
                </div>
                <div className="title">
                    <p>{title}</p>
                </div>
            </Link>
            <div className="infos">
                <p title={"Ecrit le:" + date}>Le <i>{date}</i></p>
                <p title={"Ecrit par: " + user.name}>Par {user.name}</p>
            </div>
        </Card>
    )
}


const Card = styled.article`

    border-radius: 7px;
    width: 400px;
    max-width: 85vw;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    
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
        background: ${(props) => props.thumbnail ? `url(${props.thumbnail})` : "gray"} center center no-repeat;
        background-size: cover;

        width: 100%;
        height: 200px;
        max-height: 45vw;

        .categories {
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
        }

        .title {
            background-color: #000000e2;
            padding: 0.5rem 1rem;
        }
    }
    .infos {
        display: flex;
        justify-content: space-between;
        padding-inline: 0.75rem;
        padding-block: 0.25rem;
        border: ${({ theme }) => theme.colors.container.border};
        border-radius: 0 0 7px 7px;
        border-top: none;
        background: ${({ theme }) => theme.colors.container.background};
    }
`


export default ArticleCard
