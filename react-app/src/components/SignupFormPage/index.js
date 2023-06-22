import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>
        <i className="fa-regular fa-face-smile"></i>
        Lofy
      </h2>
      <h1>Sign up for free to start listening.</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="sign-up-input-with-caption">
          <label>
            What's your email?
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email."
              />
            </div>
          </label>
        </div>
        <div className="sign-up-input-with-caption">
          <label>
            What should we call you?
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter a username."
                minLength={5}
              />
            </div>
          </label>
        </div>
        <div className="sign-up-input-with-caption">
          <label>
            Create a password
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password."
                minLength={6}
              />
            </div>
          </label>
        </div>
        <div className="sign-up-input-with-caption">
          <label>
            Confirm Password
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm password."
                minLength={6}
              />
            </div>
          </label>
        </div>
        <div className="sign-up-button-wrapper">
          <button className="sign-up-button" type="submit">Sign Up</button>
          <p>Have an account? <a className="sign-up-login-link" href="/login">Log in</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
