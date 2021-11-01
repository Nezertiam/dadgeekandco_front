import { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import Requests from "../../middleware/Requests";
import ReadContainer from "../../components/ui/ReadContainer";



const WritingPage = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isValid, setValid] = useState(false);
    const [returnToNew, setToNew] = useState(false);
    const [article, setArticle] = useState(null);
    const [createdArticle, setCreatedArticle] = useState(null);

    const { slug } = useParams();

    const getArticleAndSetValues = async (slug) => {
        const response = await Requests.getArticle(slug);
        if (response.code === 200) {
            setTitle(response.data.article.title);
            setContent(response.data.article.content);
            setCategories(response.data.article.categories);
            setArticle(response.data.article);
        } else {
            setToNew(true);
        }
    }

    useEffect(() => {
        if (slug) {
            console.log(slug)
            getArticleAndSetValues(slug)
        }
    }, [slug])


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
                        categories
                    }
                } else {
                    data = {
                        content,
                        categories
                    }
                }
                response = await Requests.putArticle(data, slug);
            } else {
                data = {
                    title,
                    content,
                    categories
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

    if (isValid) {
        return <Redirect to={`/blog/article/edit/${createdArticle.slug}`} />
    }
    if (returnToNew) {
        return <Redirect to={`/blog/article/new`} />
    }

    return (
        <Container>
            <div className="editor-container">
                <h2><span>é</span>crire un nouvel article</h2>
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
                <MDEditor
                    value={content}
                    onChange={setContent}
                />
                <div className="save-button">
                    <button onClick={handleSave} disabled={isSubmitting}>Sauvegarder</button>
                </div>
            </div>
            <div className="preview-container">
                <h2 className="preview-title">Aperçu final</h2>
                <ReadContainer title={title} content={content} />
            </div>
        </Container>
    );
}


const Container = styled.div`    

    .editor-container {
        padding: 2rem 5rem;
        margin-top: 3rem;
        .save-button {
            display: flex;
            justify-content: right;
            margin-right: 2rem;
            margin-top: 1rem;
        }
        h2 {
            text-transform: lowercase;
            letter-spacing: 2px;
            span {
                text-transform: uppercase;
            }
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