const bookingService = require("../services/bookingService");

const bookingController = {

    fetchEventAttendeesController: async (req, res, next) => {
        try {

            const attendees = await bookingService.fetchEventAttendeesService(
                req.query.eventTitle
            );

            res.status(200).json({
                success: true,
                statusCode: 200,
                data: attendees
            });

        } catch (error) {
            next(error);
        }
    },


    bookEventController: async (req, res, next) => {
    try {
        const { userId, eventId } = req.body;

        const booking = await bookingService.bookEventService(
            userId,
            eventId
        );

        res.status(201).json({
            success: true,
            statusCode: 201,
            data: booking
        });

    } catch (error) {
        next(error);
    }
},



isEventBookedByAttendeeController: async (req, res, next) => {
    try {

        const { userId, eventId } = req.query;

        const result = await bookingService.isEventBookedByAttendeeService(
            userId,
            eventId
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: result
        });

    } catch (error) {
        next(error);
    }
},



isEventFullController: async (req, res, next) => {

    try {

        const result = await bookingService.isEventFullService(
            req.query.eventId
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: result
        });

    } catch (error) {
        next(error);
    }
},


fetchAttendeeBookingsController: async (req, res, next) => {
    try {
        const bookings = await bookingService.fetchAttendeeBookingsService(
            req.params.userId
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: bookings
        });

    } catch (error) {
        next(error);
    }
},


deleteBookingController: async (req, res, next) => {
    try {
        const { userId, eventId } = req.body;

        const result = await bookingService.deleteBookingService(
            userId,
            eventId
        );

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

module.exports = bookingController;