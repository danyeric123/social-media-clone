import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()


router.get('/:id', middleware.isLoggedIn, profilesCtrl.show)
router.put('/:id', middleware.isLoggedIn, profilesCtrl.update)
router.get('/:id/edit', middleware.isLoggedIn, profilesCtrl.edit)
router.get("/:id/friend", middleware.isLoggedIn, profilesCtrl.addFriend)
router.get("/:id/unfriend", middleware.isLoggedIn, profilesCtrl.removeFriend)