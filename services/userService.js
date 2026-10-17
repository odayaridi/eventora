const User = require("../models/User");
const HttpError = require("../utils/HttpError");

const userService = {

    getUserProfileService: async (userId) => {

        // Find user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            throw new HttpError("User not found", 404);
        }

        // Convert Sequelize instance to plain object
        const userResponse = user.toJSON();

        // Remove password
        delete userResponse.password;

        return userResponse;
    },



    updateUserService: async (userId, userData) => {

        const {
            firstName,
            lastName,
            email,
            username,
            phoneNumber
        } = userData;

        // Check if user exists
        const user = await User.findByPk(userId);

        if (!user) {
            throw new HttpError("User not found", 404);
        }

        // Check if email belongs to another user
        const existingEmail = await User.findOne({
            where: { email }
        });

        if (existingEmail && existingEmail.userId !== user.userId) {
            throw new HttpError("Email already exists", 409);
        }

        // Check if username belongs to another user
        const existingUsername = await User.findOne({
            where: { username }
        });

        if (existingUsername && existingUsername.userId !== user.userId) {
            throw new HttpError("Username already exists", 409);
        }

        // Check if phone number belongs to another user
        const existingPhoneNumber = await User.findOne({
            where: { phoneNumber }
        });

        if (existingPhoneNumber && existingPhoneNumber.userId !== user.userId) {
            throw new HttpError("Phone number already exists", 409);
        }

        // Update user
        await user.update({
            firstName,
            lastName,
            email,
            username,
            phoneNumber
        });

        // Remove password from response
        const userResponse = user.toJSON();

        delete userResponse.password;

        return userResponse;
    },


    deleteUserService: async (userId) => {

        const user = await User.findByPk(userId);

        if (!user) {
            throw new HttpError("User not found", 404);
        }

        await user.destroy();

        return { message: "User deleted successfully" };
    },


};

module.exports = userService;