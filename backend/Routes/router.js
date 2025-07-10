const express = require('express')
const { register, login } = require('../controllers/AuthController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { getUserProfile, updateUserProfile } = require('../controllers/profileManage')
const router = express.Router()

// USER AUTH LOGIN AND REGISTER
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)

// USER PROFILE MANAGEMENT
router.get('/api/user/:id', jwtMiddleware , getUserProfile )
router.post('/api/user/:id', jwtMiddleware , updateUserProfile)







module.exports = router;