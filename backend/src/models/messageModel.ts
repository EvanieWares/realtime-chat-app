import { Schema, Document, model } from "mongoose";

interface IMessage extends Document {
  user: string;
  message: string;
  timeStamp: Date;
}

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
