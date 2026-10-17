const { body, param, query } = require("express-validator");

const eventValidator = {

    createEventValidator: [
        body("organizerId")
            .isInt({ min: 1 })
            .withMessage("Invalid organizer ID"),

        body("title")
            .notEmpty()
            .withMessage("Title cannot be empty"),

        body("location")
            .notEmpty()
            .withMessage("Location cannot be empty"),

        body("eventDate")
            .isISO8601()
            .withMessage("Invalid event date"),

        body("price")
            .isFloat({ min: 0 })
            .withMessage("Price must be 0 or greater"),

        body("capacity")
            .isInt({ min: 1 })
            .withMessage("Capacity must be greater than 0"),

        body("images")
            .custom((value, { req }) => {
                if (!req.files || req.files.length === 0) {
                    throw new Error("At least one image is required");
                }

                return true;
            })
    ],


    updateEventValidator: [
    param("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID"),

    body("title")
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("description")
        .isString()
        .withMessage("Description must be a string"),

    body("location")
        .notEmpty()
        .withMessage("Location cannot be empty"),

    body("eventDate")
        .isISO8601()
        .withMessage("Invalid event date"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be 0 or greater"),

    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be greater than 0"),

    body("images")
        .custom((value, { req }) => {
            if (!req.files || req.files.length === 0) {
                throw new Error("At least one image is required");
            }

            return true;
        })
],



deleteEventValidator: [
    param("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID"),

    body("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID")
],



fetchOrganizerEventsValidator: [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID")
],



fetchOrganizerEventTitlesValidator: [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID")
],



filterEventsValidator: [

    query("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),

    query("minPrice")
        .optional({ values: "falsy" })
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be a positive number or zero"),

    query("maxPrice")
        .optional({ values: "falsy" })
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be a positive number or zero"),

    query("maxPrice")
        .custom((maxPrice, { req }) => {

            const minPrice = req.query.minPrice;

            if (minPrice !== undefined && minPrice !== "" &&
                maxPrice !== undefined && maxPrice !== "") {

                if (Number(minPrice) > Number(maxPrice)) {
                    throw new Error("Minimum price cannot exceed maximum price");
                }
            }

            return true;
        })
],




isEventEndedValidator: [
    query("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID")

],

};

module.exports = eventValidator;