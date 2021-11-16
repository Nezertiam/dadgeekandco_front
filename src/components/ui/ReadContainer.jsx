import React from 'react'
import styled from 'styled-components'
import MDEditor from '@uiw/react-md-editor';
import PageContainer from '../layout/PageContainer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ReadContainer = (props) => {

    const user = useSelector((state) => state.user);
    const path = window.location.href;

    const notInEditPage = !path.includes("/blog/article/edit");
    const isAdmin = user && user.roles.includes("ROLE_ADMIN");
    const isAuthor = (props.article && user) && (props.article.user._id === user._id && user.roles.includes("ROLE_AUTHOR"));

    const date = notInEditPage && new Date(props.article.createdAt).toLocaleDateString();

    return (
        <Container {...props}>
            {
                (notInEditPage && (isAdmin || isAuthor)) &&
                <Link to={`/blog/article/edit/${props.article.slug}`}>Editer cet article</Link>
            }
            <h1>{props.article ? props.article.title : props.title}</h1>
            <hr />
            {
                ((props.article && props.article.thumbnail) || props.thumbnail) &&
                <div className="image-container">
                    <img src={props.article ? props.article.thumbnail : props.thumbnail} alt={props.article ? props.article.title : props.title} />
                </div>
            }
            {
                <p className="author">
                    Ecrit par
                    <span className="italic">&nbsp;{notInEditPage ? props.article.user.name : user.name}&nbsp;</span>
                    {
                        notInEditPage &&
                        <>
                            le
                            <span className="italic">&nbsp;{date}&nbsp;</span>
                        </>
                    }
                </p>
            }
            <MDEditor.Markdown source={props.article ? props.article.content : props.content} />
        </Container>
    )
}


const Container = styled(PageContainer)`

    background: ${({ theme }) => theme.colors.container.backgroundglass};
    backdrop-filter: blur(7px);
    width: unset;
    max-width: 950px;
    padding: 1.5rem;

    .image-container {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .italic {
        font-style: italic;
    }

    hr {
        margin: 1rem 0 2rem;
    }

    p {
        display: flex;
        flex-wrap: wrap;
        img {
            width: 300px;
            flex: 2;
        }
        &.author {
            margin-left: 2rem;
            margin-bottom: 3rem;
        }
    }

    h2 {
        margin-top: 3rem;
    }
`


export default ReadContainer
