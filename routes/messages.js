import { Router } from 'express'
import * as messagesCtrl from "../controllers/messages.js"
import * as middleware from "../middleware/middleware.js"

export {
  router
}

const router = Router()

router.post('/', middleware.isLoggedIn, messagesCtrl.create)
router.get('/:id', middleware.isLoggedIn, messagesCtrl.show)
router.post('/:id', middleware.isLoggedIn, messagesCtrl.reply)