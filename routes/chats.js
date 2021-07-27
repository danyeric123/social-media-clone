import { Router } from 'express'
import * as chatsCtrl from "../controllers/chats.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()
router.get('/', middleware.isLoggedIn, chatsCtrl.chatroom)
router.post('/', middleware.isLoggedIn, chatsCtrl.addChat);
