// Dependencies
import React from 'react'
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import TestPage from './pages/test/TestPage';
import LoginPage from './pages/auth/login/LoginPage';

// Components
// import ProtectedRoute from './components/ProtectedRoute';

// Pages


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
                <Route exact path="/test" component={TestPage} />
                <Route exact path="/connexion" component={LoginPage} />
            </Switch>
        </>
    );
}

export default Router
