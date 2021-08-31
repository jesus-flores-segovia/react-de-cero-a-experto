import React from 'react'
import './effects.css';
import { useForm } from '../../hooks/useForm';

export const FormWithCustomHook = () => {

    const [values, handleInputChange] = useForm({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <form onSubmit={handleSubmit}>
          <h1>FormWithCustomHook</h1>
          <hr/>

          <div className="form-group">
            <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your name"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Your email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
                type="password"
                name="password"
                className="form-control"
                placeholder="*****"
                value={password}
                onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" type="submit">Save</button>

        </form>
    )
}
