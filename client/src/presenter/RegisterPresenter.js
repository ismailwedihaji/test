import React, { useState } from "react";
import Register from "../view/Register";
import { useNavigate } from "react-router-dom";

/**
 * Presenter component for handling user registration functionality.
 * @returns {React.ReactElement} The Register component with an onRegister handler if not already registered,
 * otherwise displays a success message.
 */

const RegisterPresenter = () => {
  const [registerStatus, setRegisterStatus] = useState({
    isRegistered: false, // Tracks whether the user has been registered
    message: "", // Message to display based on registration success/failure
  });

  const navigate = useNavigate();

  /**
   * Handles the registration process. It sends the user details to the backend for registration,
   * updates the registration state based on the response, and navigates to the login page on success.
   * @param {string} name - The user's name.
   * @param {string} surname - The user's surname.
   * @param {string} pnr - The user's personal identification number.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} username - The desired username for the user.
   */

  const handleRegister = async (name, surname, pnr, email, password, username) => {
    
    // username validation
    if (username.length < 3) {
      setRegisterStatus({
        isRegistered: false,
        message: "Username must be at least 3 characters long.",
      });
      return;
    }

    // password validation
    if (password.length < 6) {
      setRegisterStatus({
        isRegistered: false,
        message: "password must be at least 6 characters long.",
      });
      return;
    }

    // PNR validation
    if (isNaN(pnr) || pnr.includes(".")) {
      setRegisterStatus({
        isRegistered: false,
        message: "PNR must be a number.",
      });
      return;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      setRegisterStatus({
        isRegistered: false,
        message: "Please enter a valid email address.",
      });
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, pnr, email, password, username }),
      });

      const data = await response.json();

      if (data.success) {
        setRegisterStatus({
          isRegistered: true,
          message: "Registration successful",
        });
        navigate("/login", { state: { registrationSuccess: true } });
      } else {
        setRegisterStatus({
          isRegistered: false,
          message: data.message || "Registration failed",
        });
      }
    } catch (error) {
      setRegisterStatus({
        isRegistered: false,
        message: "An error occurred during registration.",
      });
    }
  };

  return (
    <div>
      {!registerStatus.isRegistered ? (
        <div>
          <Register onRegister={handleRegister} />
          <p>{registerStatus.message}</p>
        </div>
      ) : (
        <div>
          <p>Registration successful! You can now log in.</p>
        </div>
      )}
    </div>
  );
};

export default RegisterPresenter;
