import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"
import {Chat } from '../models/chat.js'

export { 
  search,
  chatroom,
  addChat,
}

function search(req, res) {
  let regex = new RegExp(req.body.search)
  Profile.find({name: { $regex: regex, $options: 'i' }})
          .then(profiles => {
            Post.find({text: { $regex: regex, $options: 'i' }})
                    .then(posts=>{
                      res.render('search', {
                        title: "Search Results",
                        profiles,
                        posts
                      })
                    })
            
          })
          .catch((err) => {
            console.log(err)
            res.redirect("/")
          })
}

function addChat(req, res) {
  Profile.findById(req.user.profile._id)
        .then(profile => {
          if (req.body.username === profile.name) {
            Chat.create(req.body)
            .then(() => {
              res.status(201).send("Added")
            })
          } else {
            res.status(208).send("Already added")
          }
        })
}

function chatroom(req, res) {
  Profile.findById(req.user.profile._id)
          .then(profile => {
            Chat.find({})
            .sort({createdAt: "asc"})
            .limit(150)
            .then((chats) => {
              res.render('chatroom', {
                title: "Chat Room",
                chats,
                profile
              })
            })
          })
}