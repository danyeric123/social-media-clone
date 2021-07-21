import mongoose from 'mongoose'

export {
  Post,
}

const Schema = mongoose.Schema

const replySchema = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps: true
})

const postSchema = new Schema({
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

const Post = mongoose.model('Post', postSchema)