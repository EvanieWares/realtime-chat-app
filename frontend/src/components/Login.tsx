import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { login, register } from "../services/api";
import "../styles/login.css";

const Login: React.FC = () => {
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
    <div className="login-form">
      <h1>Welcome to <span>Real-Chat</span> App</h1>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={isRegister ? handleRegister : handleLogin} className="login-button">
        {isRegister ? 'Register' : 'Login'}
      </button>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
}

export default Login;
