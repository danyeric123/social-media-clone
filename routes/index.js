import { Router } from 'express'

export {
  router
}

const router = Router()
router.get('/', (req, res)=>res.redirect('/posts'))
