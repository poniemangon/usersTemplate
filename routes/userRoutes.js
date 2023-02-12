// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register); 
router.get('/login', usersController.login); 


module.exports = router;