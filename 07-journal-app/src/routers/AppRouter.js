import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JournalScreen />} />
                <Route path="auth/*" element={<AuthRouter />} />
                <Route 
                    path="*"
                    element={<Navigate to="/auth/*" replace={true} />}
                />
            </Routes>
        </BrowserRouter> 
    )
}
