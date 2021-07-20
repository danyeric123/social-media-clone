import { Router } from 'express'

export {
  router
}

const router = Router()
router.get('/', function (req, res) {
  res.redirect('/messages')
})
