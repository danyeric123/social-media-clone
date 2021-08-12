import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"
import {Chat } from '../models/chat.js'

export { 
  search,
}

// This searches all the profiles or posts with the given query using the query as a regex
function search(req, res) {
  let regex = new RegExp(req.body.search)
  Profile.find ({name: { $regex: regex, $options: 'i' }})
          .then(profiles => {
            Post.find({$or:[
              {text: { $regex: regex, $options: 'i' }},
              {categories: 
                {$elemMatch: { $regex: regex, $options: 'i' }}
              }
            ]})
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