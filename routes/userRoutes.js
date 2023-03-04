// ************ Require's ************
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const setUser = require('../middlewares/setUser');

// multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/userimages"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get(usersController.indexUser);
router.get('/register', usersController.register); 
router.post('/', usersController.store);
router.get('/login', usersController.login); 
router.post('/login', usersController.loginProcess);
router.get('/logout', usersController.logout);
router.get('/:id', usersController.getUser);
router.get('/404', usersController.getUser);
router.get('/image/:id', usersController.editImage, setUser);
router.put('/image/:id', upload.single("user_image"), usersController.updateImage, usersController.mySession);
router.get('/user/:id', usersController.editUser, setUser);
router.put('/user/:id', usersController.updateUser, usersController.mySession);





module.exports = router;