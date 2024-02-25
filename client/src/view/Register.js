import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

/**
 * Component for user registration.
 * @param {Object} props - The props object.
 * @param {Function} props.onRegister - The function to handle the registration process.
 * @returns {React.ReactElement} The register component.
 */

function Register(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pnr, setPnr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  /**
  * Handles form submission for user registration.
  * @param {Event} event - The form submission event.
  */

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onRegister(name, surname, pnr, email, password, username);
  };

  const handleAlreadyHaveAccount = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter surname"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pnr">PNR</label>
          <input
            id="pnr"
            type="text"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            placeholder="Enter pnr"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p>
        Already have an account?
        <button onClick={handleAlreadyHaveAccount} className="login-link">
          Log in
        </button>
      </p>
    </div>
  );
}

export default Register;
