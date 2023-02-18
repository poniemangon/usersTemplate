const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require("bcrypt");


const controller = {
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
       
          // hash the password
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
          // create user object
          const user = {
            id: Number(users.length > 0 ? users[users.length - 1].id + 1 : 1),
            username: req.body.username,
            password: hashedPassword,
          };
    
          // store user object in array
          users.push(user);
    
          // overwrite JSON file with new users array
          fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    
          return res.redirect("/");
      },
      logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login');
      }
};

function findByID(id) {
  let userFound = users.find(user => user.id === id);
  return userFound;
};

function findByField(field, text){
  let userFound = users.find(user => user[field] === text);
  return userFound;
}

module.exports = controller;