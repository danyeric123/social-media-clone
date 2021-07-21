import { Router } from 'express'
import * as indexCtrl from "../controllers/index.js"
export {
  router
}

const router = Router()
router.get('/', (req, res)=>res.redirect('/posts'))
router.post('/search', indexCtrl.search)
