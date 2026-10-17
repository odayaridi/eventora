const authService = require("../services/authService");

const authController = {

    registerUserController: async (req, res, next) => {
        try {

            const user = await authService.registerUserService(req.body);

            res.status(201).json({
                success: true,
                statusCode: 201,
                data: user
            });

        } catch (error) {
            next(error);
        }
    },

    loginUserController: async (req, res, next) => {
        try {

            const user = await authService.loginUserService(req.body);

            res.status(200).json({
                success: true,
                statusCode: 200,
                data: user
            });

        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;