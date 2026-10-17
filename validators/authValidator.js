const { body } = require("express-validator");

const authValidator = {

    registerUserValidator: [
        body("firstName")
            .notEmpty()
            .withMessage("First name cannot be empty")
            .isString()
            .withMessage("First name should consist of letters"),

        body("lastName")
            .notEmpty()
            .withMessage("Last name cannot be empty")
            .isString()
            .withMessage("Last name should consist of letters"),

        body("email")
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Invalid email format"),

        body("username")
            .notEmpty()
            .withMessage("Username cannot be empty")
            .isString()
            .withMessage("Username must be a string"),


        body("phoneNumber")
            .trim()
            .notEmpty()
            .withMessage("Phone number is required")
            .isLength({ max: 20 })
            .withMessage("Phone number must not exceed 20 characters"),    

        body("password")
            .notEmpty()
            .withMessage("Password cannot be empty")
            .isLength({ min: 6 })
            .withMessage("Password should consist of at least 6 characters"),

        body("roleName")
            .notEmpty()
            .withMessage("Role cannot be empty")
            .isIn(["EVENT_ORGANIZER", "ATTENDEE"])
            .withMessage("Invalid role")
    ],

    loginUserValidator: [
        body("email")
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Invalid email format"),

        body("password")
            .notEmpty()
            .withMessage("Password cannot be empty")
    ]
};

module.exports = authValidator;