// ************ Require's ************
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get(usersController.indexUser);
router.get('/register', usersController.register); 
router.post('/', usersController.store);
router.get('/login', usersController.login); 
router.post('/login', usersController.loginProcess);
router.get('/logout', usersController.logout);





module.exports = router;