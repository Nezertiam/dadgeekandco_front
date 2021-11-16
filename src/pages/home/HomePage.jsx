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
            <h1 className="title">Le <span className="primary-color">blog</span> des Geemers</h1>

            {/* <div className="placeholder"></div> */}

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
                    ? props.articles.map((article) => {
                        return <ArticleCard article={article} key={article._id} />;
                    })
                    : <p>{props.noArticleMessage}</p>
            }
        </div>
    )
}



const Container = styled(PageContainer)`
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
        display: grid;
        justify-items: center;
        margin-bottom: 2rem;
        gap: 1.5rem;
        
        @media screen and (min-width: 700px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`


export default HomePage
