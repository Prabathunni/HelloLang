const express = require('express')
const { register, login } = require('../controllers/AuthController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { getUserProfile, updateUserProfile } = require('../controllers/profileManage')
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllRequests } = require('../controllers/friendSystem')
const { getUsersForSideBar, getUserMessageController } = require('../controllers/MessageController')
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
// accept req
router.put('/api/friends/:id/accept', jwtMiddleware, acceptFriendRequest)
// reject req
router.delete('/api/friends/:id/reject', jwtMiddleware, rejectFriendRequest)
// get all req
router.get('/api/friends',jwtMiddleware, getAllRequests)



// REAL-TIME CHAT SYSTEM_____________________________________
// users for sidebar
router.get('/api/messages/users',jwtMiddleware, getUsersForSideBar)
// load a users messages
router.get('/api/messages/:id',jwtMiddleware, getUserMessageController)








module.exports = router;