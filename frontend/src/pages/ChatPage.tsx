import React from 'react';
import ChatBox from '../components/ChatBox';
import '../styles/chat.css';

const ChatPage: React.FC = () => {
  return (
    <div className='chat-box'>
      <h1>Chat Room</h1>
      <ChatBox />
    </div>
  );
};

export default ChatPage;
