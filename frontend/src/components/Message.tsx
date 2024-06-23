import React, { useContext } from "react";
import "../styles/message.css";
import { UserContext } from "../context/UserContext";

interface MessageProps {
  message: {
    user: string;
    message: string;
    timeStamp: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { user } = useContext(UserContext);
  const [showOptions, setShowOptions] = React.useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option: string) => {
    if (option === 'delete') {
      // Handle delete option
      console.log('Deleted message:', message.message);
    } else if (option === 'copy') {
      // Handle copy option
      navigator.clipboard.writeText(message.message);
      console.log('Copied message:', message.message);
    }
    setShowOptions(false);
  };

  return (
    <div className={message.user === user ? "message me" : "message"}>
      <strong>{message.user === user ? "" : message.user}</strong>
      <p>{message.message}</p>
      <small>{new Date(message.timeStamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
      <div className="options-icon" onClick={handleOptionsClick}>⋮</div>
      <div className={`options-menu ${showOptions ? 'show' : ''}`}>
        <ul>
          <li onClick={() => handleOptionSelect('delete')}>Delete</li>
          <li onClick={() => handleOptionSelect('copy')}>Copy</li>
        </ul>
      </div>
    </div>
  );
};

export default Message;
