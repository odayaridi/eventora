const bcrypt = require("bcrypt");
const User = require("../models/User");
const HttpError = require("../utils/HttpError");

const authService = {

    registerUserService: async (userData) => {
    const {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        password,
        roleName
    } = userData;

    // Check if email already exists
    const existingEmail = await User.findOne({
        where: { email }
    });

    if (existingEmail) {
        throw new HttpError("Email already exists", 409);
    }

    // Check if username already exists
    const existingUsername = await User.findOne({
        where: { username }
    });

    if (existingUsername) {
        throw new HttpError("Username already exists", 409);
    }

    // Check if phone number already exists
    const existingPhoneNumber = await User.findOne({
        where: { phoneNumber }
    });

    if (existingPhoneNumber) {
        throw new HttpError("Phone number already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        password: hashedPassword,
        roleName
    });

    // Remove password from response
    const userResponse = user.toJSON();

    delete userResponse.password;

    return userResponse;
},


    loginUserService: async (loginData) => {

        const { email, password } = loginData;

        // Find user by email
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new HttpError("Invalid email or password", 401);
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new HttpError("Invalid email or password", 401);
        }

        // Convert Sequelize instance to plain object
        const userResponse = user.toJSON();

        // Remove password
        delete userResponse.password;

        return userResponse;
    }
};

module.exports = authService;