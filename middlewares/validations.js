const { body } = require("express-validator");

module.exports = [
    body("usuername").notEmpty().withMessage("Username es obligatorio").bail(),
    body("password").isLength({ min: 6 }).withMessage("Minimo 6 caracteres").bail()

]