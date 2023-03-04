const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });
const User = require('../models/User');



const controller = {
    register: (req, res)=>{
    res.render('register');
    },  
    register: (req, res)=>{
        res.render('register');
    },
    login: (req, res)=>{
        res.render('login');
    },
    loginProcess: (req, res) => {
      let userToLog = findByField('username', req.body.username);
      if(userToLog) {
        let passwordCheck = bcrypt.compareSync(req.body.password, userToLog.password);
        if(passwordCheck){ 
          req.session.userLogged = userToLog;
          console.log(req.session.userLogged);
          return res.redirect('/');
        }
      }
      return res.render('login', {
        errors: "User not found"
      });
    },
    indexUser: (req, res) => {
      
      return res.render('header', {user: req.session.userLogged});
        
  },
    store: (req, res) => {
          console.log('req:', req)
          // hash the password
          
          const userData = req.body;
          // create user object
          const result = User.create(userData);
          if (result == 'yes'){
            return res.redirect('/');
          }
          else {
            return res.redirect('back');
          }
    

    
          
          },
      
      logout: (req, res) => {
        req.session.destroy();
          ``
        return res.redirect('back');
      },
      getUser: (req, res) => {
        const id = req.params.id;
        const userFound = User.getUser(id);
        if (userFound) {
          console.log(userFound.id);
          return res.render('profile', {userFound});
        }
        else {
          return res.render('404');
        }
      },
      editImage: (req, res) => {
        const id = req.params.id;
        const picUser = User.editImage(id);
        return res.render("imageForm", { picUser });
      },
      updateImage: (req, res) => {
        const id = req.params.id;
        
        if (req.file) {
        const imagen = req.file.filename;
        User.updateImage(id, imagen);
        const userBuscado = User.getUser(id);
        req.session.userLogged.image = userBuscado.image;
        
        return res.redirect("/");}
        else {return res.redirect('back');}
      },
      mySession: (req, res) => {
        
      }
};

function findByID(id) {
  let userFound = User.findAll().find(user => user.id === id);
  return userFound;
};

function findByField(field, text){
  let userFound = User.findAll().find(user => user[field] === text);
  return userFound;
};

function getUsersList(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function guardarUser(userToStore) {

	const users = getUsersList(usersPath);

	const usersList = users.map(usuario => {
		if(usuario.id == userToStore.id) {
			return userToStore;
		}
		return usuario;
		
	});

	fs.writeFileSync(usersPath, JSON.stringify(usersList, null, 2));
}



module.exports = controller;