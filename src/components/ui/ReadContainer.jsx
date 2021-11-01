import React from 'react'
import styled from 'styled-components'
import MDEditor from '@uiw/react-md-editor';


const ReadContainer = (props) => {
    return (
        <Container {...props}>
            <h1>{props.title}</h1>
            <hr />
            <MDEditor.Markdown source={props.content} />
        </Container>
    )
}


const Container = styled.div`

    .wmde-markdown.wmde-markdown-color{
        &>p:first-child {
            img {
                width: 100%;
            }
        }
    }


    max-width: 750px;
    margin: 2rem auto;

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
