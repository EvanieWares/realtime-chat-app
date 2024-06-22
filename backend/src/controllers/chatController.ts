import { Request, Response } from "express";
import Message from "../models/messageModel";

/**
 * Retrieves all messages from the database and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find().sort({ timeStamp: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch messages" });
  }
};

/**
 * Posts a new message to the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the message is saved.
 */
const postMessage = async (req: Request, res: Response): Promise<void> => {
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
