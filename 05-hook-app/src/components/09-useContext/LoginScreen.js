import React, { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { UserContext } from './UserContext';

export const LoginScreen = () => {

    const [values, handleInputChange, reset] = useForm({
        email: "",
        password: "",
    });

    const {email, password} = values;

    const {user, setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(values);
        reset();
        console.log(values);
    };

    return (
        <div>
            <h1>LoginScreen</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={email} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="inputPassword" value={password} onChange={handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
