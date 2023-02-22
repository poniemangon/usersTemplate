const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });



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
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
          // create user object
          const user = {
            id: Number(users.length > 0 ? users[users.length - 1].id + 1 : 1),
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            mail: req.body.mail,
            image: 'default.jpg'
          };
          const usernameFound = users.find(test => test.username == user.username);
          const mailFound = users.find(test => test.mail == user.mail);
          // store user object in array
          if (mailFound || usernameFound){
            return res.redirect('back');
          }
          else {
          users.push(user);
    
          // overwrite JSON file with new users array
          fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    
          return res.redirect("/")
          };
      },
      logout: (req, res) => {
        req.session.destroy();
          ``
        return res.redirect('back');
      },
      getUser: (req, res) => {
        const userFound = users.find(user => user.id == req.params.id);
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
        const picUser = users.find(picUser => picUser.id == id);
        return res.render("imageForm", { picUser });
      },
      updateImage: (req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        user.image = req.file.filename;
        guardarUser(user);
        return res.redirect("/products");
      },
};

function findByID(id) {
  let userFound = users.find(user => user.id === id);
  return userFound;
};

function findByField(field, text){
  let userFound = users.find(user => user[field] === text);
  return userFound;
};
function guardarUser(userToStore) {

	const users = getUsersList(usersFilePath);

	const usersList = users.map(usuario => {
		if(usuario.id == userToStore.id) {
			return userToStore;
		}
		return usuario;
		
	});

	fs.writeFileSync(usersFilePath, JSON.stringify(usersList, null, 2));
}



module.exports = controller;