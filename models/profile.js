import mongoose from 'mongoose'
import { Post } from './post.js'

export {
  Profile
}

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post"}],
  bio: String,
  friends: [{ type: Schema.Types.ObjectId, ref: "Profile"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)