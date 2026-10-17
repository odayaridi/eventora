const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const bookingValidator = require("../validators/bookingValidator");
const validateRequest = require("../middlewares/validateRequest");

router.get(
    "/event-attendees",
    bookingValidator.fetchEventAttendeesValidator,
    validateRequest,
    bookingController.fetchEventAttendeesController
);

/*        Atttendee                   */
router.post(
    "/bookEvent",
    bookingValidator.bookEventValidator,
    validateRequest,
    bookingController.bookEventController
);


router.get(
    "/isEventBookedByAttendee",
    bookingValidator.isEventBookedByAttendeeValidator,
    validateRequest,
    bookingController.isEventBookedByAttendeeController
);


router.get(
    "/isEventFull",
    bookingValidator.isEventFullValidator,
    validateRequest,
    bookingController.isEventFullController
);



router.get(
    "/fetchAttendeeBookings/:userId",
    bookingValidator.fetchAttendeeBookingsValidator,
    validateRequest,
    bookingController.fetchAttendeeBookingsController
);



router.delete(
    "/deleteBooking",
    bookingValidator.deleteBookingValidator,
    validateRequest,
    bookingController.deleteBookingController
);


module.exports = router;