const express = require('express')
const { register, login, logoutUser } = require('../controllers/AuthController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { getUserProfile, updateUserProfile } = require('../controllers/profileManage')
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllFriends, getAllUsers, getMyRequests } = require('../controllers/friendSystem')
const { getUsersForSideBar, getUserMessageController, sendMessageToUserController } = require('../controllers/MessageController')
const upload = require('../middlewares/multer.js')
const router = express.Router()
const verifyloginController = require('../controllers/verifyController.js')

// USER AUTH LOGIN AND REGISTER___________________________________________
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)
router.get('/api/auth/logout', jwtMiddleware, logoutUser)


// VERIFYLOGIN FOR APP________________
router.get('/api/verifylogin',jwtMiddleware ,verifyloginController)


// USER PROFILE MANAGEMENT____________________________________________
router.get('/api/user/:id', jwtMiddleware , getUserProfile )
router.put('/api/user/:id', jwtMiddleware , upload.single('profilePicture'),  updateUserProfile)


// FRIEND SYSTEM______________________________________________
// get my friend requests
router.get('/api/friends',jwtMiddleware, getMyRequests)
// send friend request
router.post('/api/friends/:id/request',jwtMiddleware, sendFriendRequest)
// accept req
router.put('/api/friends/:id/accept', jwtMiddleware, acceptFriendRequest)
// reject req
router.delete('/api/friends/:id/reject', jwtMiddleware, rejectFriendRequest)
// get all my friends
router.get('/api/friends/all',jwtMiddleware, getAllFriends)




// BUG => SHOULD ONLY PROVIDE NEW USERS (NO NEED FRIEND USERS)
// get all users to send friend req
router.get('/api/users', jwtMiddleware, getAllUsers )



// REAL-TIME CHAT SYSTEM_____________________________________
// users for sidebar
router.get('/api/messages/users',jwtMiddleware, getUsersForSideBar)
// load a users messages
router.get('/api/messages/:id',jwtMiddleware, getUserMessageController)
// send a message ---text+image ~ multer+cloudinary
router.post('/api/messages/:id/send',jwtMiddleware, upload.single('image'), sendMessageToUserController)








module.exports = router;