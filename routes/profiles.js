import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()

router.post('/search', middleware.isLoggedIn, profilesCtrl.search)
router.get('/:id', middleware.isLoggedIn, profilesCtrl.show)
router.put('/:id', middleware.isLoggedIn, profilesCtrl.update)
router.get('/:id/edit', middleware.isLoggedIn, profilesCtrl.edit)
router.get("/:id/follow", middleware.isLoggedIn, profilesCtrl.follow)
router.get("/:id/unfollow", middleware.isLoggedIn, profilesCtrl.unfollow)