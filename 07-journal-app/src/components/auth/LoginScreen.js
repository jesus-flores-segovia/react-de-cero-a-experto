import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        email: "floressegoviajesus@gmail.com",
        password: "123456"
    })

    const {email, password} = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
          <h3 className="auth__title">Login</h3>

          <form className="animate__animated animate__fadeIn animate__faster" onSubmit={handleLogin}>
            <input 
                type="text"
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
            />
            <input 
                type="password"
                placeholder="Password"
                name="password"
                className="auth__input"
                autoComplete="off"
                value={password}
                onChange={handleInputChange}
            />
            <button
                type="submit"
                className="buttons__btn buttons__btn-primary buttons__btn-block"
                disabled={loading}
            >
                Login
            </button>
            <div className="auth__social-networks">
                <p>Login with social networks</p>
                <div className="google-btn"
                    onClick={handleGoogleLogin}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with Google</b>
                    </p>
                </div>
            </div>
            <Link to="/auth/register" className="links__link">
                Create new account
            </Link>
          </form>  
        </>
    )
}
