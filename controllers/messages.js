import { Message } from '../models/message.js'

export { 
  index, 
  create, 
  show, 
  reply 
}

function index(req, res) {
  Message.find({})
  .populate('author')
  .sort({createdAt: "asc"})
  .then((messages) => {
    res.render('messages/index', {
      title: 'Social Media Homepage',
      messages: messages.reverse()
    })
  })
}

function create(req, res) {
  req.body.author = req.user.profile
  Message.create(req.body)
  .then(()=> {
    res.redirect('/messages')
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate('author')
  .populate({
    path: 'replies',
    populate: {
      path: 'author'
    }
  })
  .then((message)=> {
    res.render('messages/show', {
      title: 'Message Details',
      message
    })
  })
}

function reply(req, res) {
  Message.findById(req.params.id)
  .then((message)=> {
    req.body.author = req.user.profile
    message.replies.push(req.body)
    message.save()
    .then(()=> {
      res.redirect(`/messages/${req.params.id}`)
    })
  })
}