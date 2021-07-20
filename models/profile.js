import mongoose from 'mongoose'
import { messageSchema } from './message.js'

export {
  Profile
}

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  messages: [messageSchema],
  bio: String,
  friends: [{ type: Schema.Types.ObjectId, ref: "Profile"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)