import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

export default model("Message", messageSchema);
