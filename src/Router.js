// Dependencies
import React from 'react'
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/errors/NotFound";
import NewArticlePage from './pages/blog/NewArticlePage';
import EditArticlePage from './pages/blog/EditArticlePage';
import ReadArticlePage from './pages/blog/ReadArticlePage';
import Blog from './pages/blog/Blog';


const Router = () => {

    const isLoading = useSelector((state) => state.isLoading);

    if (isLoading) return (
        <>
            <Switch>
                <Route path="/">
                    <p>Chargement...</p>
                </Route>
            </Switch>
        </>
    )


    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/connexion" component={LoginPage} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/blog/article/read/:slug" component={ReadArticlePage} />
                <ProtectedRoute exact path="/blog/article/new" component={NewArticlePage} role="ROLE_AUTHOR" />
                <ProtectedRoute exact path="/blog/article/edit/:slug" component={EditArticlePage} role="ROLE_AUTHOR" />
                <Route path="/" component={NotFound} />
            </Switch>
        </>
    );
}

export default Router
