import { Router } from 'express'
import * as indexCtrl from "../controllers/index.js"
import * as middleware from '../middleware/middleware.js'
export {
  router
}

const router = Router()
router.get('/', (req, res)=>res.redirect('/posts'))
router.post('/search', indexCtrl.search)

router.get('/chatroom', middleware.isLoggedIn, indexCtrl.chatroom)
router.post('/chatroom', middleware.isLoggedIn, indexCtrl.addChat)
