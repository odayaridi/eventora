const eventService = require("../services/eventService");

const eventController = {

    createEventController: async (req, res, next) => {
        try {
            const event = await eventService.createEventService(req.body, req.files);

            res.status(201).json({
                success: true,
                statusCode: 201,
                data: event
            });

        } catch (error) {
            next(error);
        }
    },

    updateEventController: async (req, res, next) => {
    try {

        const event = await eventService.updateEventService(
            req.params.eventId,
            req.body,
            req.files
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: event
        });

    } catch (error) {
        next(error);
    }
},

   deleteEventController: async (req, res, next) => {
    try {

        const result = await eventService.deleteEventService(
            req.params.eventId,
            req.body.userId
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



fetchOrganizerEventsController: async (req, res, next) => {
    try {

        const events = await eventService.fetchOrganizerEventsService(
            req.params.userId
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: events
        });

    } catch (error) {
        next(error);
    }
},



fetchOrganizerEventTitlesController: async (req, res, next) => {
    try {

        const events = await eventService.fetchOrganizerEventTitlesService(
            req.params.userId
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: events
        });

    } catch (error) {
        next(error);
    }
},



filterEventsController: async (req, res, next) => {
    try {
        const events = await eventService.filterEventsService(req.query);

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: events
        });

    } catch (error) {
        next(error);
    }
},

isEventEndedController: async (req, res, next) => {
    try {
        const result = await eventService.isEventEndedService(
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

};

module.exports = eventController;