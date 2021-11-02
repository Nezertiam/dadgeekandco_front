import React from 'react'
import styled from 'styled-components'

const ArticleCard = (props) => {

    const { article } = props;

    return (
        <Card {...props} thumbnail={article.thumbnail}>
            <div className="article">
                <div className="categories">
                    Badge
                </div>
                <div className="title">
                    <p>{article.title}</p>
                </div>
            </div>
            <div className="infos">
                <div></div>
            </div>
        </Card>
    )
}


const Card = styled.div`
    background: url(${props => props.thumbnail}) center center no-repeat;
    background-size: cover;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    .title {
        background-color: rgba(0,0,0,0.7)
    }
`


export default ArticleCard
