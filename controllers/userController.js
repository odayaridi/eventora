const userService = require("../services/userService");

const userController = {

    getUserProfileController: async (req, res, next) => {
        try {

            const user = await userService.getUserProfileService(req.params.userId);

            res.status(200).json({
                success: true,
                statusCode: 200,
                data: user
            });

        } catch (error) {
            next(error);
        }
    },


    updateUserController: async (req, res, next) => {
    try {

        const user = await userService.updateUserService(
            req.params.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: user
        });

    } catch (error) {
        next(error);
    }
},



deleteUserController: async (req, res, next) => {
    try {

        const result = await userService.deleteUserService(req.params.userId);

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: result
        });

    } catch (error) {
        next(error);
    }
},

};

module.exports = userController;