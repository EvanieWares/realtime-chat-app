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

  return (
    <div className={message.user === user ? "message me" : "message"}>
      <strong>{message.user === user ? "" : message.user}</strong>
      <p>{message.message}</p>
      <small>{new Date(message.timeStamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
    </div>
  );
};

export default Message;
