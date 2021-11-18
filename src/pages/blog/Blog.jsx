import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PageContainer from '../../components/layout/PageContainer';
import ArticleCard from '../../components/ui/ArticleCard';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import NothingToShow from '../../components/ui/NothingToShow';
import Requests from '../../middleware/Requests'

const Blog = () => {

    const [articles, setArticles] = useState([]);
    const [message, setMessage] = useState(null);
    const [noMore, setNoMore] = useState(false);
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const limit = 20;

    const fetchArticles = async (limit = 20, page = 1, category = null) => {
        const response = await Requests.getArticles(limit, page, category);
        if (response.code !== 200) {
            setMessage(response.message);
            return null;
        } else {
            if (!response.data || response.data.length !== limit) {
                setNoMore(true);
            }
            return response.data;
        }
    }
    const fetchCategories = async () => {
        const response = await Requests.getCategories();
        if (response.code !== 200) {
            return [];
        } else {
            return response.data;
        }
    }

    const newSearch = async (category = null) => {
        setMessage(null);
        setArticles([]);
        setNoMore(false);
        setPage(1);
        const data = await fetchArticles(limit, 1, category);
        if (!data || data.length !== limit) {
            setNoMore(true);
        }
        setArticles(data);
    }

    const more = async () => {
        if (!noMore) {
            const newPage = page + 1;
            const data = await fetchArticles(limit, newPage, category);
            if (!data || data.length !== limit) {
                setNoMore(true);
            } else {
                const newArticleList = [...articles, ...data];
                setArticles(newArticleList);
                setPage(newPage);
            }
        }
    }


    useEffect(() => {
        const firstFetch = async () => {
            const articles = await fetchArticles(limit);
            setArticles(articles);
            const categories = await fetchCategories();
            setCategories(categories);
        }
        firstFetch();
    }, [])

    return (
        <Container>
            <h1 className="title">Lire un article</h1>

            <div className="filters">
                <h2>Rechercher par catégorie</h2>
                <div className="category-filter">
                    {
                        categories.length > 0 &&
                        <>
                            <select name="categories" id="category-select" onChange={(e) => { setCategory(e.target.value) }}>
                                <option value={"all"}>Toutes les catégories</option>
                                {
                                    categories.map((category) => {
                                        return <option value={category.slug} key={category._id}>{category.title}</option>
                                    })
                                }
                            </select>
                            <button onClick={() => newSearch((category === "all" ? null : category))}>Faire une recherche</button>
                        </>
                    }
                </div>
            </div>

            <Divider />

            <div className="article-container">
                {
                    articles && articles.length > 0
                        ? articles.map((article) => {
                            return (
                                <ArticleCard article={article} key={article._id} />
                            )
                        })
                        : <NothingToShow message={message ?? "Aucun article à afficher..."} />
                }
            </div>
            {
                !noMore
                    ? <Button title="Afficher plus d'articles" position="center" onClick={() => more(limit)}>Afficher plus d'articles</Button>
                    : <></>
            }
        </Container>
    )
}

const Container = styled(PageContainer)`
    .filters {
        padding: 2rem 1rem 0;
        h2 {
            text-align: center;
            @media screen and (min-width: 700px) {
                text-align: left;
            }
        }
        .category-filter {
            padding-top: 1rem;
            &>* {
                padding: 0.75rem 2rem;
                display: block;
                margin: 0 auto;
                margin-bottom: 1rem;
                @media screen and (min-width: 700px) {
                    margin-left: 0;
                    margin-right: 0;
                }
            }
            @media screen and (min-width: 700px) {
                display: flex;
                gap: 2rem;
            }
        }
    }
    .article-container {
        display: grid;
        justify-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        margin-top: 2rem;
        @media screen and (min-width: 700px) {
            grid-template-columns: 1fr 1fr;
        }
        @media screen and (min-width: 900px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`

export default Blog
