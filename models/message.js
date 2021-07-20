import mongoose from 'mongoose'

export {
  Message,
  messageSchema
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

const Message = mongoose.model('Message', messageSchema)