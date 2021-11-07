import React, { useContext } from 'react';
import { login } from '../../actions/authActions';
import { AuthContext } from '../../auth/AuthContext';

export const LoginScreen = ({history}) => {

    const {dispatch} = useContext(AuthContext);

    const lastPath = localStorage.getItem("lastPath") || "/";

    const handleLogin = () => {
        dispatch(login("Jesús"));
        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr/>
            <button 
                className="btn btn-primary"
                onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}
