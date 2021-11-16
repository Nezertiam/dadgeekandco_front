import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PageContainer from '../../components/layout/PageContainer';
import ArticleCard from '../../components/ui/ArticleCard';
import NothingToShow from '../../components/ui/NothingToShow';
import Requests from '../../middleware/Requests'

const Blog = () => {

    const [articles, setArticles] = useState([]);
    const [message, setMessage] = useState(null);

    const fetchArticles = async () => {
        const response = await Requests.getArticles(20, 1);
        setArticles(response.data);
        setMessage(response.message);
    }

    useEffect(() => {
        fetchArticles();
    }, [])

    return (
        <Container>
            <h1 className="title">Lire un article</h1>
            <div className="article-container">
                {
                    articles.length > 0
                        ? articles.map((article) => {
                            return (
                                <ArticleCard article={article} key={article._id} />
                            )
                        })
                        : <NothingToShow message={message ?? "Aucun article à afficher..."} />
                }
            </div>
        </Container>
    )
}

const Container = styled(PageContainer)`
    .article-container {
        display: grid;
        justify-items: center;
        gap: 1.5rem;
        @media screen and (min-width: 700px) {
            grid-template-columns: 1fr 1fr;
        }
        @media screen and (min-width: 900px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`

export default Blog
