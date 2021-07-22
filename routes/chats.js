import { Router } from 'express'
import * as chatCtrl from "../controllers/chats.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()
router.get('/', middleware.isLoggedIn, chatCtrl.chatRoom)
