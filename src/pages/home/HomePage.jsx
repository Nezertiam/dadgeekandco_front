// Dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

// Container
import PageContainer from '../../components/layout/PageContainer';
import ArticleCard from '../../components/ui/ArticleCard';

// Middlewares
import Requests from '../../middleware/Requests';



const HomePage = () => {

    const [lastArticles, setLastArticles] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const findLastArticles = async () => {
            const response = await Requests.getArticles();
            setLastArticles(response.data);
            setMessage(response.message);
        }
        findLastArticles();
    }, [])

    return (
        <Container>
            <h1>Le blog des Geemers</h1>
            <ArticlesUpdates articles={lastArticles} noArticleMessage={message} />
        </Container>
    )
}


const ArticlesUpdates = (props) => {
    return (
        <div className="article-news-container">
            {
                props.articles
                    ? props.articles.map((article, index) => {
                        return <ArticleCard article={article} key={index} />;
                    })
                    : <p>{props.noArticleMessage}</p>
            }
        </div>
    )
}



const Container = styled(PageContainer)`
    h1 {
        text-align: center;
        margin-top: 1rem;
    }
    .article-news-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        &>* {
            margin: 1rem 0;
        }
    }
`


export default HomePage
