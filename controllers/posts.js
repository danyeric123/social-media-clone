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
  likeAndUnlike,
}

//Pulls the person's profile and then all the posts written either by the owner
// or the people the profile follows in descending order
function index(req, res) {
  Profile.findById(req.user.profile._id)
        .then(profile=>{
          Post.find({author:{$in:[...profile.following,req.user.profile]}})
            .populate('author')
            .populate('likes')
            .sort({createdAt: "desc"})
            .then((posts) => {
              res.render('posts/index', {
                title: 'Social Media Homepage',
                posts: posts
              })
            })
        })
        .catch(err=>{
          console.log(err)
          res.redirect('/posts')
        })
}


//Creates a post with given categories that are seperated by semicolon
function create(req, res) {
  req.body.author = req.user.profile
  req.body.categories=req.body.categories.split("; ")
  Post.create(req.body)
      .then((post)=> {
        Profile.findById(req.user.profile)
                .then(profile=>{
                  profile.posts.push(post._id)
                  profile.save()
                })
        res.redirect('/posts')
      })
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}


//Shows a given posts and its replies
function show(req, res) {
  Post.findById(req.params.id)
      .populate('author')
      .populate('likes')
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
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}


//Shows the posts of a give category given the category id
function categoryShow(req, res) {
  Post.find({categories:req.params.categoryId})
      .populate('author')
      .sort({createdAt: "asc"})
      .then((posts) => {
        res.render('posts/index', {
          title: `Posts of ${req.params.categoryId}`,
          posts: posts.reverse()
        })
      })
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}

//Reply to a post and pushes the reply to the replies array in post model instance
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
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}


//Find the author of the post and then remove the post from the author
// Then remove the post from the database
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

// Edit the post
function edit(req, res) {
  Post.findById(req.params.id)
      .then(post => {
        res.render('posts/edit', {
          title: `Edit Post`,
          post
        })
      })
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}

//Find and update the post
function update(req, res) {
  req.body.categories=req.body.categories.split("; ")
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((post) => {
        res.redirect(`/posts/${req.params.id}`)
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/')
      })
}

//Like or unlike the post depending on whether the person liked already the post
function likeAndUnlike(req,res){
  Post.findById(req.params.id)
      .then(post=>{
        if(!post.likes.includes(req.user.profile._id)){
          post.likes.push(req.user.profile)
          post.save()
        }else{
          post.likes.remove({_id:req.user.profile._id})
          post.save()
        }
        res.redirect(req.headers.referer)
      })
      .catch(err=>{
        console.log(err)
        res.redirect('/posts')
      })
}