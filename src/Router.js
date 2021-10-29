// Dependencies
import React from 'react'
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

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
            </Switch>
        </>
    );
}

export default Router
