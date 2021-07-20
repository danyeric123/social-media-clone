import mongoose from 'mongoose'
import { messageSchema } from './message'

export {
  Profile
}

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  messages: [messageSchema],
  bio: String,
  friends: [{ type: Schema.Types.ObjectId, ref: "Profile"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)