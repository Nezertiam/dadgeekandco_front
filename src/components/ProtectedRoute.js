import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {

    const roles = useSelector((state) => state.user.roles);

    return (
        <>
            {
                (roles.includes(props.role) || roles.includes("ROLE_ADMIN")) ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        </>
    )
}

export default ProtectedRoute;
