import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
  Chat
}

const chatSchema = new Schema({
  username: String,
  avatar: String,
  message: String,
},{
  timestamps: true,
});

const Chat = mongoose.model("Chat", chatSchema);