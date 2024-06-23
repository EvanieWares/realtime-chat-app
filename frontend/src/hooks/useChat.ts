import { useState, useEffect, useContext } from "react";
import socket from "../utils/socket";
import { UserContext } from "../context/UserContext";
import { fetchMessages, postMessage } from "../services/api";

interface Message {
  user: string;
  message: string;
  timeStamp: string;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket.on("chat message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (message: string) => {
    if (user) {
      postMessage(user, message, localStorage.getItem("token") || "")
        .then((newMessage) => {
          socket.emit("chat message", newMessage);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages(localStorage.getItem("token") || "")
        .then((data) => setMessages(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return { messages, sendMessage };
}

export default useChat;
