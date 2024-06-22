import { Request, Response } from "express";
import Message from "../models/messageModel";

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ timeStamp: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch messages" });
  }
};

const postMessage = async (req: Request, res: Response) => {
  const { user, message } = req.body;

  try {
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to send message" });
  }
};

export { getMessages, postMessage };
