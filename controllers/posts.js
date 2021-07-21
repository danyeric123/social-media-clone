import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

export { 
  index, 
  create, 
  show, 
  reply,
  categoryShow,
  deletePost as delete,
  edit,
  update,
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
  req.body.categories=req.body.categories.split("; ")
  console.log(req.body.categories)
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

function categoryShow(req, res) {
  Post.find({name: req.body.category})
      .populate('author')
      .sort({createdAt: "asc"})
      .then((posts) => {
        res.render('posts/index', {
          title: 'Social Media Homepage',
          posts: posts.reverse()
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

function deletePost(req,res){
  Profile.findById(req.params.profileId)
  .then((profile) => {
    profile.posts.remove({_id: req.params.postId})
    profile.save()
    Post.findOneAndDelete({_id: req.params.postId})
    .then(() => {
      res.redirect(`/posts`)
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/posts')
  })
}

function edit(req, res) {
  Post.findById(req.params.id)
      .then(post => {
        res.render('posts/edit', {
          title: `Edit Post`,
          post
        })
      })
}

function update(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((post) => {
        res.redirect(`/posts`)
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/')
      })
    }