import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {

    return (
        <>
            {
                props.validity ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        </>
    )
}

export default ProtectedRoute;
