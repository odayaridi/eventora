const { body, param } = require("express-validator");
const userValidator = {

    getUserProfileValidator: [
        param("userId")
            .isInt({ min: 1 })
            .withMessage("Invalid user ID")
    ],

    updateUserValidator: [
        param("userId")
            .isInt({ min: 1 })
            .withMessage("Invalid user ID"),

        body("firstName")
            .notEmpty()
            .withMessage("First name cannot be empty")
            .isString()
            .withMessage("First name must be a string"),

        body("lastName")
            .notEmpty()
            .withMessage("Last name cannot be empty")
            .isString()
            .withMessage("Last name must be a string"),

        body("email")
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Invalid email format"),

        body("phoneNumber")
            .trim()
            .notEmpty()
            .withMessage("Phone number is required")
            .isLength({ max: 20 })
            .withMessage("Phone number must not exceed 20 characters"),    

        body("username")
            .notEmpty()
            .withMessage("Username cannot be empty")
            .isString()
            .withMessage("Username must be a string")
    ],



    deleteUserValidator: [
        param("userId")
            .isInt({ min: 1 })
            .withMessage("Invalid user ID")
    ],



    fetchOrganizerEventsValidator: [
        param("userId")
            .isInt({ min: 1 })
            .withMessage("Invalid user ID")
    ],


};

module.exports = userValidator;