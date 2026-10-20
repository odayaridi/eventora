const express = require("express");
const router = express.Router();

const userValidator = require("../validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");
const userController = require("../controllers/userController");

router.get(
    "/profile/:userId",
    userValidator.getUserProfileValidator,
    validateRequest,
    userController.getUserProfileController
);


router.put(
    "/update/:userId",
    userValidator.updateUserValidator,
    validateRequest,
    userController.updateUserController
);



module.exports = router;
