const express = require("express");
const router = express.Router();

const authValidator = require("../validators/authValidator");
const validateRequest = require("../middlewares/validateRequest");
const authController = require("../controllers/authController");

router.post(
    "/register",
    authValidator.registerUserValidator,
    validateRequest,
    authController.registerUserController
);

router.post(
    "/login",
    authValidator.loginUserValidator,
    validateRequest,
    authController.loginUserController
);

module.exports = router;