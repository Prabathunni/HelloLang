const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat_messages',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});

const upload = multer({ storage });

module.exports = upload;
