import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import { UserContext } from './context/UserContext';

const App: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/chat" /> : <LoginPage />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
