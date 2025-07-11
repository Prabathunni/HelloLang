const express = require('express')
const { register, login } = require('../controllers/AuthController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { getUserProfile, updateUserProfile } = require('../controllers/profileManage')
const { sendFriendRequest } = require('../controllers/friendSystem')
const router = express.Router()

// USER AUTH LOGIN AND REGISTER___________________________________________
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)


// USER PROFILE MANAGEMENT____________________________________________
router.get('/api/user/:id', jwtMiddleware , getUserProfile )
router.post('/api/user/:id', jwtMiddleware , updateUserProfile)


// FRIEND SYSTEM______________________________________________
// send friend request
router.post('/api/friends',jwtMiddleware, sendFriendRequest)







module.exports = router;