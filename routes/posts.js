import { Router } from 'express'
import * as postsCtrl from "../controllers/posts.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()

router.get('/', postsCtrl.index)
router.post('/', middleware.isLoggedIn, postsCtrl.create)
router.get('/:id', middleware.isLoggedIn, postsCtrl.show)
router.post('/:id', middleware.isLoggedIn, postsCtrl.reply)