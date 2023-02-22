const { body } = require("express-validator");

module.exports = [
    body("user_image").notEmpty().withMessage("Username es obligatorio").bail(),


]