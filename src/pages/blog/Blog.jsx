import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReadArticle from "./ReadArticle";

const Blog = () => {
    return (
        <>
            <Switch>
                <Route exact path="/blog/article/:slug" component={ReadArticle} />
                <Redirect to="/blog" />
            </Switch>
        </>
    )
}

export default Blog;
