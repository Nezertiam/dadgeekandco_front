import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {

    const isLogged = useSelector((state) => state.isLogged);
    const user = useSelector((state) => state.user)

    if (!isLogged) {
        return <Redirect to="/" />
    }


    return (
        <>
            {
                (user.roles.includes(props.role) || user.roles.includes("ROLE_ADMIN")) ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        </>
    )
}

export default ProtectedRoute;
