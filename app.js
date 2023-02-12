const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());



app.listen(3000);

// views path y viewengine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// uso de rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

