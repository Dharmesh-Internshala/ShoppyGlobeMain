import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5500/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        setMessage("Login successful!");
        setLoginSuccess(true);
        localStorage.setItem("token", data.token); // Store JWT token
        setTimeout(() => {
          navigate("/"); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        setMessage("Incorrect email or password.");
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
      setLoginSuccess(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>{loginSuccess ? `Welcome, ${email.split("@")[0]}` : "Login"}</h2>
      {message && <p style={{ color: loginSuccess ? "green" : "red" }}>{message}</p>}

      {!loginSuccess ? (
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="success-message">
          <p>You have successfully logged in!</p>
          {/* Add additional UI elements like a dashboard link or logout button */}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
