// Dependencies
import React from 'react'
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { getFromLS } from './utils/storage';
import TestPage from './pages/test/TestPage';

// Components
// import ProtectedRoute from './components/ProtectedRoute';

// Pages


const Router = () => {

    const isLoading = useSelector((state) => state.isLoading);
    const themes = getFromLS("all-themes");

    console.log(themes)

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
            </Switch>
        </>
    );
}

export default Router
