const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });


const User = {
    fileName: './data/users.json',
    
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    
    findAll: function () {
        return this.getData();
    },
    getUser: function (id){
        const userFound = this.findAll().find(user => user.id == id);
        return userFound;
    },
    findByField: function (field, text){
        let userFound = users.find(iter => iter[field] == text);
        return userFound;
      },

    generateId: function () {
        const allUsers = this.findAll();
        const allUsersId = [];
        allUsers.forEach(iter => allUsersId.push(iter.id));
        const newId = MAXIMUM(allUsersId) + 1;

        return newId;
    },
    saveUser: function(userData){
        const users = this.findAll();
        users.push(userData);
        const usersPath = this.fileName;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    },
    updateUser: function(userData, id){
        const users = this.findAll();
        const index = users.findIndex(thing => thing.id == id);
        users[index] = userData;
        const usersPath = this.fileName;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));


    },
    create: function (userData){
        
        
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newUser = {
            id: this.generateId(),
            username: userData.username,
            password: hashedPassword,
            name: userData.name,
            mail: userData.mail,
            image: 'default.jpg'
        };
        console.log(newUser);
        const checkUser = this.findAll().find(test => test.username == newUser.username);
        const checkMail = this.findAll().find(test => test.mail == newUser.mail);
        if (checkUser || checkMail){
            console.log('javier');
            const confirm = 'no';
            return confirm;
        }
        else {
            const confirm = 'yes';
            this.saveUser(newUser);
            return confirm;
        }
    },
    editImage: function (id) {
        const picUser = this.findAll().find(picUser => picUser.id == id);
        console.log(picUser);
        return picUser;
      },
    updateImage: function (id, imagen) {
        const userBuscado = this.findAll().find(userBuscado => userBuscado.id == id);
        
        if (userBuscado.image !== 'default.jpg') {
          const imagePath = path.join(__dirname, '../public/images/userimages', userBuscado.image);
          fs.unlink(imagePath, (err) => {
            if (err) console.error(err);
          });
        }
        userBuscado.image = imagen;
        this.updateUser(userBuscado, id);
     
        
        
        return userBuscado;
       
      },
      editUser: function (id) {
        const picUser = this.findAll().find(picUser => picUser.id == id);
        console.log(picUser);
        return picUser;
      },
        onUserUpdate: function (id, newData) {
        console.log(newData, 'AAAAAA');
        const userBuscado = this.findAll().find(userBuscado => userBuscado.id == id);
        
        const newHashedPassword = bcrypt.hashSync(newData.password, 10);
        
        userBuscado.username = newData.username;
        userBuscado.password = newHashedPassword;
        userBuscado.name = newData.name;
        userBuscado.mail = newData.mail;
        console.log(userBuscado);
        this.updateUser(userBuscado, id);
     
        
        
        return userBuscado;
       
      },



    
};




function MAXIMUM(array){
    let max = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] > max){
            max = array[i];
        };
      }
    return max;

    
};

module.exports = User;