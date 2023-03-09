const router = require('express').Router()
const { register, login, whoAmI } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', whoAmI)

module.exports = router