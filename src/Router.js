// Dependencies
import React from 'react'
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Test from "./pages/Test";
import Blog from "./pages/Blog";

const Router = () => {

    const isLoading = useSelector((state) => state.isLoading);
    const isLogged = useSelector((state) => state.isLogged);

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
                <ProtectedRoute path="/test" isLogged={isLogged} component={Test} />
                <Route path="/blog" component={Blog} />
            </Switch>
        </>
    );
}

export default Router
