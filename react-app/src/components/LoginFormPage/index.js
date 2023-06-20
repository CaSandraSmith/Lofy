import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoClick = async(e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  }

  return (
    <div className="login-all-content">
      <div className="log-in-header">
        <div>
          <i className="fa-regular fa-face-smile"></i>
          <h2>Lofy</h2>
        </div>
        <h1>Log in to Lofy</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-input-wrapper">
          <p>Email</p>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
        </label>
        <label className="login-input-wrapper">
          <p>Password</p>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
        </label>
        <div className="login-buttons">
          <button className="login-button" type="submit">Log In</button>
          <button onClick={handleDemoClick} type="button" className="demo-login-button">Log in as Demo</button>
        </div>
        <div className="sign-up-link-on-login">
          <p>Don't have an account</p>
          <a href="/signup">Sign up for Spotify</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
