import React, { useState, useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import Message from './Message';
import { IoSend } from 'react-icons/io5';
import '../styles/chat.css';

const ChatBox: React.FC = () => {
  const [newMessage, setNewMessage] = useState("")
  const { messages, sendMessage } = useChat()
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottomSmooth = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottomSmooth();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage("")
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="message-container-wrapper">
      <div className="message-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="message-input">
        <textarea className='message-input-box'
          value={newMessage}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={3}
        />
        <IoSend className="send-icon" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatBox