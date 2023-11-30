const { body, param } = require('express-validator')
const validators = {};

validators.createPostValidator = [
    param("identifier")
    .optional()
    .notEmpty().withMessage("identifier is required")
    .isMongoId().withMessage("Indentificador tiene que ser un id de mongo"),
    body("title")
        .notEmpty().withMessage("title is required"),
    body("description")
        .notEmpty().withMessage("description is required")
        .isLength({ max: 280 }).withMessage("La description maxima es de 280 caracteres"),
    body("image")
    .notEmpty().withMessage("La imagen es requerida")
    .isURL().withMessage("Image must be an URL")
];

validators.IdInParamsValidator = [
    param("identifier")
    .notEmpty().withMessage("identifier is required")
    .isMongoId().withMessage("Indentificador tiene que ser un id de mongo")
]

module.exports = validators;