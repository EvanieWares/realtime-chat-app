import React, { useContext, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { login, register } from "../services/api";
import "../styles/form.css";

const Form: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      setUser(username);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const data = await register(username, password);
      localStorage.setItem('token', data.token);
      setUser(username);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <div className="input-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <FaUser className="icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Username"
          required
        />
        <FaLock className="icon" />
      </div>
      <button
        onClick={isRegister ? handleRegister : handleLogin}
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
      <div className="register-link">
        <p>Don't have an account? <a href="#" onClick={() => setIsRegister(!isRegister)}>Register</a></p>
      </div>
    </div>
  )
}

export default Form