import { Router } from 'express'
import * as postsCtrl from "../controllers/posts.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()

router.get('/', postsCtrl.index)
router.post('/', middleware.isLoggedIn, postsCtrl.create)
router.get('/category', middleware.isLoggedIn, postsCtrl.categoryShow)
router.get('/:id', middleware.isLoggedIn, postsCtrl.show)
router.get('/:id/edit', middleware.isLoggedIn, postsCtrl.edit)
router.put('/:id', middleware.isLoggedIn, postsCtrl.update)
router.post('/:id', middleware.isLoggedIn, postsCtrl.reply)
router.delete('/:postId/profile/:profileId', middleware.isLoggedIn, postsCtrl.delete)