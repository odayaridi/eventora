const { body, query, param } = require("express-validator");
const bookingValidator = {

    fetchEventAttendeesValidator: [
        query("eventTitle")
            .trim()
            .notEmpty()
            .withMessage("Event title is required")
    ],

    bookEventValidator: [
    body("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID"),

    body("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID")

    ],


    fetchAttendeeBookingsValidator: [
        param("userId")
            .isInt({ min: 1 })
            .withMessage("Invalid user ID")

    ],


    deleteBookingValidator: [
    body("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID"),

    body("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID")
],


isEventBookedByAttendeeValidator: [
    query("userId")
        .isInt({ min: 1 })
        .withMessage("Invalid user ID"),

    query("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID")

],


isEventFullValidator: [
    query("eventId")
        .isInt({ min: 1 })
        .withMessage("Invalid event ID")

],

};

module.exports = bookingValidator;