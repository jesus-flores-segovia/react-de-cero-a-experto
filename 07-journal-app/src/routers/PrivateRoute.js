import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({
    children,
    isLoggedIn
}) => {
    return !isLoggedIn
        ? <Navigate to="/auth"/>
        : children 
}