import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'

import { JournalScreen } from '../components/journal/JournalScreen'
import { auth } from '../firebase/firebaseConfig'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes());
            } else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" 
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <JournalScreen/>
                        </PrivateRoute>
                        }/>
                <Route path="auth/*" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn}>
                            <AuthRouter/>
                        </PublicRoute>
                        }/>
                <Route 
                    path="*"
                    element={<Navigate to="/auth/*" replace={true} />}
                />
            </Routes>
        </BrowserRouter> 
    )
}
