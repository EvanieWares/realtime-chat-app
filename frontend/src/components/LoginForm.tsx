import React, { useContext, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { login, register } from "../services/api";
import "../styles/form.css";
import { AxiosError } from "axios";

const LoginForm: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setError("");
    if (username === "" || password === "") {
      setError("Please enter a username and password");
      return;
    }
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      setUser(username);
    } catch (error: AxiosError | any) {
      setError(error.response.data.message);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (username === "" || password === "") {
      setError("Please enter a username and password");
      return;
    }
    try {
      const data = await register(username, password);
      localStorage.setItem('token', data.token);
      setUser(username);
    } catch (error: AxiosError | any) {
      setError(error.response.data.message);
    }
  };

  const handleOnLoginRegisterClick = () => {
    setError("");
    setIsRegister(!isRegister);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, done: boolean) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (done) {
        isRegister ? handleRegister() : handleLogin();
      } else {
        passwordInputRef.current?.focus();
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <div className={error === "" ? "input-box" : "input-box error"}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(event) => { handleKeyDown(event, false) }}
          placeholder="Username"
          required
        />
        <FaUser className="icon" />
      </div>
      <div className={error === "" ? "input-box" : "input-box error"}>
        <input
          type="password"
          value={password}
          ref={passwordInputRef}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => { handleKeyDown(event, true) }}
          placeholder="Password"
          required
        />
        <FaLock className="icon" />
      </div>
      <button
        onClick={isRegister ? handleRegister : handleLogin}
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
      <div className="error-message"> {error} </div>
      <div className="register-link">
        <p>{isRegister ? "Already have an account? " : "Don't have an account? "}
          <a href="#" onClick={() => handleOnLoginRegisterClick()}>{isRegister ? 'Login' : 'Register'}</a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm