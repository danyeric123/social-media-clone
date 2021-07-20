import mongoose from 'mongoose'

export {
  Profile,
  Message
}

const replySchema = new mongoose.Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const messageSchema = new mongoose.Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  category: String,
  replies: [replySchema]
},{
  timestamps: true
})

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
const Message = mongoose.model('Message', messageSchema)