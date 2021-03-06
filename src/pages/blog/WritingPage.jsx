import { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import Requests from "../../middleware/Requests";
import ReadContainer from "../../components/ui/ReadContainer";

import { NewCategoryPopup } from "./NewCategory";


const WritingPage = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isValid, setValid] = useState(false);
    const [returnToNew, setToNew] = useState(false);
    const [article, setArticle] = useState(null);
    const [createdArticle, setCreatedArticle] = useState(null);
    const [list, setList] = useState(null);
    const user = useSelector((state) => state.user);
    const [openPopup, setPopup] = useState(false);

    const { slug } = useParams();

    const creatingCategory = useSelector((state) => state.creatingCategory);

    useEffect(() => {
        if (creatingCategory) {
            getCategories();
            setPopup(false);
            dispatch({ type: "CATEGORY_CREATED" });
        }
    }, [creatingCategory, dispatch])

    const getCategories = async () => {
        const response = await Requests.getCategories();
        if (response.code === 200) {
            setList(response.data);
        } else {
            setToNew(true);
        }
    }

    useEffect(() => {
        getCategories();
        const getArticleAndSetValues = async (slug) => {
            const response = await Requests.getArticle(slug);
            if (response.code === 200) {
                if (response.data.article.user._id === user._id || user.roles.includes("ROLE_ADMIN")) {
                    setTitle(response.data.article.title);
                    setThumbnail(response.data.article.thumbnail)
                    setContent(response.data.article.content);
                    setArticle(response.data.article);
                    // setCategories(response.data.article.categories)
                    const resCat = response.data.article.categories;
                    const cats = [];
                    resCat.map((category) => {
                        return cats.push(category._id);
                    })
                    setCategories(cats);
                } else {
                    setToNew(true);
                }
            } else if (response.code === 503) {

            } else {
                setToNew(true);
            }
        }
        if (slug) {
            getArticleAndSetValues(slug)
        }
    }, [slug, user._id, user.roles])

    const handleSave = async () => {
        if (!isSubmitting) {
            setSubmitting(true);
            let data;
            let response;
            if (slug) {
                if (article.title !== title) {
                    data = {
                        title,
                        content,
                        categories,
                        thumbnail
                    }
                } else {
                    data = {
                        content,
                        categories,
                        thumbnail
                    }
                }
                response = await Requests.putArticle(data, slug);
            } else {
                data = {
                    title,
                    content,
                    categories,
                    thumbnail
                }
                response = await Requests.postArticle(data);
            }
            if (response.code === 201) {
                setCreatedArticle(response.data);
                setValid(true)
            } else {
                setSubmitting(false);
            }
        }
    }


    const handleCategories = (id) => {
        const cats = categories;
        if (categories.includes(id)) {
            cats.splice(cats.indexOf(id), 1);
        } else {
            cats.push(id);
        }
        setCategories(cats);
        console.log(categories)
    }


    if (isValid) {
        return <Redirect to={`/blog/article/edit/${createdArticle.slug}`} />
    }
    if (returnToNew) {
        return <Redirect to={`/blog/article/new`} />
    }

    return (
        <>
            <Container>
                {
                    (openPopup && !creatingCategory) &&
                    <NewCategoryPopup close={() => {
                        setPopup(false);
                    }} />
                }

                <div className="editor-container">
                    <h2>??crire un nouvel article</h2>
                    <hr />


                    <label htmlFor="article-title-input">Titre</label>
                    <input
                        type="text"
                        id="article-title-input"
                        name="article-title-input"
                        placeholder="Titre de l'article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    <label htmlFor="article-thumbnail-input">Image principale</label>
                    <input
                        type="text"
                        id="article-thumbnail-input"
                        name="article-thumbnail-input"
                        placeholder="Image principale de l'article (lien http vers une image)"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />


                    <label htmlFor="article-categories-checklist">Cat??gories</label>
                    <div id="article-categories-checklist" className="categories-list">
                        {
                            list &&
                            list.map((element, index) => {
                                return (
                                    <div key={index} className="list-element">
                                        <button
                                            onClick={(e) => { handleCategories(element._id); e.target.classList.toggle("active") }}
                                            className={`category-btn${categories.includes(element._id) ? " active" : ""}`}
                                        >
                                            {element.title}
                                        </button>
                                    </div>
                                )
                            })
                        }
                        {
                            !list &&
                            <div>
                                Pas de cat??gorie encore cr????e...
                            </div>
                        }
                        <div>
                            <button
                                className={`category-btn add`}
                                onClick={() => !openPopup && setPopup(true)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <label>Contenu</label>
                    <MDEditor
                        value={content}
                        onChange={setContent}
                    />
                    <div className="save-button">
                        <button onClick={handleSave} disabled={isSubmitting}>Sauvegarder</button>
                    </div>
                </div>
                <div className="preview-container">
                    <h2 className="preview-title">Aper??u final</h2>
                    <ReadContainer title={title} content={content} thumbnail={thumbnail} />
                </div>
            </Container >
        </>
    );
}


const Container = styled.div`    

    .editor-container {
        padding: 2rem 5rem;
        margin-top: 3rem;
        .category-btn {
            padding: 0;
            padding: 0.25rem 1rem;
            margin: 0.25rem;
            
            background-color: white;
            color: ${({ theme }) => theme.colors.text};
            border-radius: 20px;

            transition: background-color 0.4s, color 0.2s;

            &:focus:active {
                transform: translateY(3px);
            }

            &.active {
                color: ${({ theme }) => theme.colors.textContrast};
                background-color: ${({ theme }) => theme.colors.secondary};
            }
            &.add {
                border: 1px solid gray;
            }
        }
        .save-button {
            display: flex;
            justify-content: right;
            margin-right: 2rem;
            margin-top: 1rem;
        }
        .categories-list {
            display: flex;
            margin-bottom: 0.75rem;
            display: flex;
            flex-wrap: wrap; 
        }
        h2 {
            text-transform: lowercase;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        hr {
            margin: 1rem auto 3rem;
        }
        label {
            font-weight: 700;
            text-transform: uppercase;
        }
        input {
            margin-top: 0;
        }
    }

    .preview-container {
        .preview-title {
            text-align: center;
            padding: 2rem 1rem;
        }
    }
`



export default WritingPage;