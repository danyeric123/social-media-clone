import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"

export { 
  search, 
  show, 
  update, 
  addFriend, 
  removeFriend, 
  edit 
}

function search(req, res) {
  Profile.find({name: req.body.search})
          .then(profiles => {
            res.render('profiles/index', {
              title: "Profiles",
              profiles,
            })
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
}

function show(req, res) {
  Profile.findById(req.params.id)
        .populate("friends")
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

function addFriend(req, res) {
  Profile.findById(req.user.profile)
          .then(profile => {
            profile.friends.push(req.params.id)
            profile.save()
            .then(()=> {
              res.redirect(`/profiles/${req.params.id}`)
            })
          })
          .catch((err) => {
            console.log(err)
            res.redirect('/')
          })
}

function removeFriend(req, res) {
  Profile.findById(req.user.profile)
        .then(profile => {
          let idx = profile.friends.indexOf(req.params.id)
          profile.friends.splice(idx, 1)
          profile.save()
          .then(()=> {
            res.redirect(`/profiles/${req.params.id}`)
          })
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
}