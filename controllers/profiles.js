import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"

export { 
  search, 
  show, 
  update, 
  follow, 
  unfollow, 
  edit,
  index,
  getName,
}

function index(req, res) {
  Profile.find({})
          .then(profiles => {
            res.render('profiles/index', {
              title: "All Users",
              profiles,
            })
          })
          .catch((err) => {
            console.log(err)
            res.redirect("/")
          })
}

function search(req, res) {
  let regex = new RegExp(req.body.search)
  Profile.find({name: { $regex: regex, $options: 'i' }})
          .then(profiles => {
            res.render('profiles/index', {
              title: "Search Results",
              profiles,
            })
          })
          .catch((err) => {
            console.log(err)
            res.redirect("/")
          })
}

function edit(req, res) {
  Profile.findById(req.params.id)
        .then(profile => {
          res.render('profiles/edit', {
            title: `Editing ${profile.name}'s profile`,
            profile
          })
        })
        .catch((err) => {
          console.log(err)
          res.redirect("/")
        })
}

function getName(req, res) {
  Profile.findById(req.user.profile)
          .then(profile=>{
            res.json(profile.name);
          })
          .catch(err=>{
            console.log(err)
            res.redirect("/chatroom")
          })
}

function show(req, res) {
  Profile.findById(req.params.id)
        .populate("following")
        .populate("followers")
        .then((profile) => {
          Post.find({ author: profile._id })
          .then((posts) => {
            Profile.findById(req.user.profile)
            .then(userProfile => {
              res.render("profiles/show", {
                title: `${profile.name}'s profile`,
                profile,
                userProfile,
                posts
              })
            })
          })
        })
        .catch((err) => {
          console.log(err)
          res.redirect("/")
        })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((profile) => {
          res.redirect(`/profiles/${profile._id}`)
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
}

function follow(req, res) {
  Profile.findById(req.user.profile)
          .then(followerProfile => {
            followerProfile.following.push(req.params.id)
            followerProfile.save()
            .then(()=> {
              Profile.findById(req.params.id)
                     .then(followingProfile=>{
                        followingProfile.followers.push(req.user.profile)
                        followingProfile.save()
                     })
              res.redirect(`/profiles/${req.params.id}`)
            })
          })
          .catch((err) => {
            console.log(err)
            res.redirect('/')
          })
}

function unfollow(req, res) {
  Profile.findById(req.user.profile)
        .then(followerProfile => {
          followerProfile.following.remove({_id:req.params.id})
          followerProfile.save()
          .then(()=> {
            Profile.findById(req.params.id)
                    .then(followingProfile=>{
                      followingProfile.followers.remove({_id: req.user.profile._id})
                      followingProfile.save()
                    })
            res.redirect(`/profiles/${req.params.id}`)
          })
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
}