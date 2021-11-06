import React from 'react'
import styled from 'styled-components'
import MDEditor from '@uiw/react-md-editor';
import PageContainer from '../layout/PageContainer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ReadContainer = (props) => {

    const user = useSelector((state) => state.user);
    const path = window.location.href;

    return (
        <Container {...props}>
            {
                (!path.includes("/blog/article/edit") && ((user && user.roles.includes("ROLE_ADMIN")) || ((props.article && user) && props.article.user._id === user._id))) &&
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
            <MDEditor.Markdown source={props.article ? props.article.content : props.content} />
        </Container>
    )
}


const Container = styled(PageContainer)`

    background: ${({ theme }) => theme.colors.container.backgroundglass};
    backdrop-filter: blur(7px);
    width: unset;
    max-width: 750px;

    .image-container {
        width: 100%;
        img {
            width: 100%;
        }
    }

    hr {
        margin: 1rem 0 2rem;
    }

    p {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img {
            width: 200px;
        }
    }

    h2 {
        margin-top: 3rem;
    }
`


export default ReadContainer
