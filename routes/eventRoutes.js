const express = require("express");
const router = express.Router();

const eventValidator = require("../validators/eventValidator");
const validateRequest = require("../middlewares/validateRequest");
const uploadEventImages = require("../middlewares/uploadEventImages");
const eventController = require("../controllers/eventController");

router.post(
    "/create",
    uploadEventImages.array("images", 3),
    eventValidator.createEventValidator,
    validateRequest,
    eventController.createEventController
);

router.put(
    "/update/:eventId",
    uploadEventImages.array("images", 3),
    eventValidator.updateEventValidator,
    validateRequest,
    eventController.updateEventController
);

router.delete(
    "/delete/:eventId",
    eventValidator.deleteEventValidator,
    validateRequest,
    eventController.deleteEventController
);

router.get(
    "/organizer/:userId",
    eventValidator.fetchOrganizerEventsValidator,
    validateRequest,
    eventController.fetchOrganizerEventsController
);

router.get(
    "/organizer/:userId/titles",
    eventValidator.fetchOrganizerEventTitlesValidator,
    validateRequest,
    eventController.fetchOrganizerEventTitlesController
);

/// For attendee 


router.get(
    "/filterEvents",
    eventValidator.filterEventsValidator,
    validateRequest,
    eventController.filterEventsController
);


router.get(
    "/isEventEnded",
    eventValidator.isEventEndedValidator,
    validateRequest,
    eventController.isEventEndedController
);



module.exports = router;