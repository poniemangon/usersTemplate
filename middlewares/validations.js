const { body } = require("express-validator");

module.exports = [
    body("username").notEmpty().withMessage("Username es obligatorio").bail(),
    body("password").isLength({ min: 6 }).withMessage("Minimo 6 caracteres").bail(),
    body("name").isEmpty().bail(),
    body("password").isEmail().bail(),

]