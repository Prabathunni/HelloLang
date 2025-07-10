const express = require('express')
const { register, login } = require('../controllers/AuthController')
const router = express.Router()

// USER AUTH LOGIN AND REGISTER
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)








module.exports = router;