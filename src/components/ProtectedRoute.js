import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {

    return (
        <>
            {
                props.isLogged ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        </>
    )
}

export default ProtectedRoute;
