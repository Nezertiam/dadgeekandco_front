// Dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

// Container
import PageContainer from '../../components/layout/PageContainer';
import ArticleCard from '../../components/ui/ArticleCard';
import ButtonStyleLink from '../../components/ui/ButtonStyleLink';
import Divider from '../../components/ui/Divider';
import NothingToShow from '../../components/ui/NothingToShow';

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
            <h1>Le <span className="primary-color">blog</span> des Geemers</h1>

            <div className="placeholder"></div>

            <section id="last-articles">
                <h2>Les derniers articles</h2>
                <Divider />

                {
                    lastArticles
                        ? <>
                            <ArticlesUpdates articles={lastArticles} noArticleMessage={message} />

                            <ButtonStyleLink to="/blog" position="center" title="Aller au blog">
                                Lire plus d'articles
                            </ButtonStyleLink>
                        </>
                        : <NothingToShow message={message ?? "Aucun article à afficher..."} />
                }
            </section>


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
        text-transform: uppercase;
    }
    h2 {
        text-align: center;
    }
    .primary-color {
        color: ${({ theme }) => theme.colors.primary}
    }
    .placeholder {
        height: 100px;
    }
    .article-news-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 1rem;

        &>* {
            margin: 1rem;
        }
    }
`


export default HomePage
