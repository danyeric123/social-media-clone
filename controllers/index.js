import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"

export { 
  search,
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