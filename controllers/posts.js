import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

export { 
  index, 
  create, 
  show, 
  reply 
}

function index(req, res) {
  Profile.find(req.user.profile._id)
        .then(profile=>{
          //author:{$in:profile.friends}
          Post.find({})
            .populate('author')
            .sort({createdAt: "asc"})
            .then((posts) => {
              res.render('posts/index', {
                title: 'Social Media Homepage',
                posts: posts.reverse()
              })
            })
        })
  
}

function create(req, res) {
  req.body.author = req.user.profile
  console.log(req.body)
  Post.create(req.body)
  .then(()=> {
    res.redirect('/posts')
  })
}

function show(req, res) {
  Post.findById(req.params.id)
  .populate('author')
  .populate({
    path: 'replies',
    populate: {
      path: 'author'
    }
  })
  .then((post)=> {
    res.render('posts/show', {
      title: 'Post Details',
      post
    })
  })
}

function reply(req, res) {
  Post.findById(req.params.id)
  .then((post)=> {
    req.body.author = req.user.profile
    post.replies.push(req.body)
    post.save()
    .then(()=> {
      res.redirect(`/posts/${req.params.id}`)
    })
  })
}