import { Server } from "socket.io";
import Message from "../models/messageModel";

/**
 * Sets up a WebSocket server and listens for connections. When a connection
 * is established, it logs a message to the console. When a "chat message"
 * event is received, it creates a new Message object with the user and message
 * data, saves it to the database, and emits a "chat message" event to all
 * connected clients with the new message. When a "disconnect" event is received,
 * it logs a message to the console and disconnects the client.
 *
 * @param {Server} io - The Socket.IO server instance.
 * @return {void} This function does not return anything.
 */
const setupWebSocket = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chat message", async (data) => {
      const { user, message } = data;
      const newMessage = new Message({ user, message });
      await newMessage.save();
      io.emit("chat message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");

      socket.disconnect(true);
    });
  });
};

export default setupWebSocket;
