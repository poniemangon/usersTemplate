const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride =  require('method-override'); 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'gonpo',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());





// setuser

const setUser = require('./middlewares/setUser');
app.use(setUser);
const imagePath = ('/images/userimages');
app.locals.imagePath = imagePath;



app.listen(3000);

// views path y viewengine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// uso de rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

