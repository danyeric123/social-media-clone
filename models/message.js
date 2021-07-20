import mongoose from 'mongoose'

export {
  Message,
  messageSchema
}

const Schema = mongoose.Schema

const replySchema = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const messageSchema = new Schema({
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