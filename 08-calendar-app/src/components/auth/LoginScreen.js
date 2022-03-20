import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { isValidEmail } from "../../helpers/validator";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: "",
    loginPassword: "",
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginEmail.trim().length === 0) {
      Swal.fire("Cannot login", "Email is mandatory", "error");
      return;
    } else if (!isValidEmail(loginEmail)) {
      Swal.fire("Cannot login", "Email is not valid", "error");
      return;
    }

    if (!loginPassword.length >= 6) {
      Swal.fire(
        "Cannot login",
        "Password must be at least of 6 characters",
        "error"
      );
    }

    dispatch(startLogin(loginEmail, loginPassword));
  };

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
  });

  const { registerName, registerEmail, registerPassword, registerPassword2 } =
    formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerName.trim().length === 0) {
      Swal.fire("Cannot register", "Name is mandatory", "error");
      return;
    }

    if (registerEmail.trim().length === 0) {
      Swal.fire("Cannot register", "Email is mandatory", "error");
      return;
    } else if (!isValidEmail(registerEmail)) {
      Swal.fire("Cannot register", "Email is not valid", "error");
      return;
    }

    if (registerPassword.length < 6) {
      Swal.fire(
        "Cannot register",
        "Password must be at least of 6 characters",
        "error"
      );
      return;
    }

    if (registerPassword !== registerPassword2) {
      Swal.fire("Cannot register", "Password fields must match", "error");
    }

    dispatch(startRegister(registerName, registerEmail, registerPassword));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat the password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
