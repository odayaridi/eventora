const Booking = require("../models/Booking");
const sequelize = require("../config/db");
const Event = require("../models/Event");
const EventImage = require("../models/EventImage");
const User = require("../models/User");
const HttpError = require("../utils/HttpError");

const eventService = {

   createEventService: async (eventData, images) => {

    const { organizerId, title, description, location, eventDate, price, capacity } = eventData;

    const organizer = await User.findByPk(organizerId);

    if (!organizer) {
        throw new HttpError("Organizer not found", 404);
    }

    if (organizer.roleName !== "EVENT_ORGANIZER") {
        throw new HttpError("User is not an event organizer", 403);
    }

    // Check if event title already exists
    const existingEvent = await Event.findOne({
        where: { title }
    });

    if (existingEvent) {
        throw new HttpError("Event title already exists", 409);
    }

    // Create event
    const event = await Event.create({
        organizerId,
        title,
        description,
        location,
        eventDate,
        price,
        capacity
    });

    // Save event images
    const eventImages = images.map((image) => ({
        eventId: event.eventId,
        imageUrl: image.filename
    }));

    const savedImages = await EventImage.bulkCreate(eventImages);

    const eventResponse = event.toJSON();

    eventResponse.images = savedImages.map((image) => image.toJSON());

    return eventResponse;
},



   updateEventService: async (eventId, eventData, images) => {

    const { userId, title, description, location, eventDate, price, capacity } = eventData;

    // Check user
    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    if (user.roleName !== "EVENT_ORGANIZER") {
        throw new HttpError("User is not an event organizer", 403);
    }

    // Check event
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    // Check ownership
    if (event.organizerId !== user.userId) {
        throw new HttpError("This event does not belong to you", 403);
    }

    // Check if another event already uses this title
    const existingEvent = await Event.findOne({
        where: { title }
    });

    if (existingEvent && existingEvent.eventId !== event.eventId) {
        throw new HttpError("Event title already exists", 409);
    }

    // Check existing bookings
    const bookingsCount = await Booking.count({
        where: { eventId }
    });

    if (Number(capacity) < bookingsCount) {
        throw new HttpError(
            "Event capacity cannot be less than the current number of bookings",
            400
        );
    }

    // Update event details
    await event.update({
        title,
        description,
        location,
        eventDate,
        price,
        capacity
    });

    // Remove old image records
    await EventImage.destroy({
        where: { eventId }
    });

    // Save new images
    const eventImages = images.map((image) => ({
        eventId: event.eventId,
        imageUrl: image.filename
    }));

    const savedImages = await EventImage.bulkCreate(eventImages);

    const eventResponse = event.toJSON();

    eventResponse.images = savedImages.map((image) => image.toJSON());

    return eventResponse;
},


deleteEventService: async (eventId, userId) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    if (user.roleName !== "EVENT_ORGANIZER") {
        throw new HttpError("User is not an event organizer", 403);
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    if (event.organizerId !== user.userId) {
        throw new HttpError("This event does not belong to you", 403);
    }

    await event.destroy();

    return { message: "Event deleted successfully" };
},





fetchOrganizerEventsService: async (userId) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    if (user.roleName !== "EVENT_ORGANIZER") {
        throw new HttpError("User is not an event organizer", 403);
    }

    const events = await Event.findAll({
        where: { organizerId: userId },
        order: [["createdAt", "DESC"]]
    });

    const eventsResponse = [];

    for (const event of events) {

        const images = await EventImage.findAll({
            where: { eventId: event.eventId },
            attributes: ["eventImageId", "imageUrl"]
        });

        const eventResponse = event.toJSON();

        eventResponse.images = [];

        for (const image of images) {
            eventResponse.images.push(image.toJSON());
        }

        eventsResponse.push(eventResponse);
    }

    return eventsResponse;
},



fetchOrganizerEventTitlesService: async (userId) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    if (user.roleName !== "EVENT_ORGANIZER") {
        throw new HttpError("User is not an event organizer", 403);
    }

    const events = await Event.findAll({
        where: { organizerId: userId },
        attributes: ["eventId", "title"],
        order: [["title", "ASC"]]
    });

    return events;
},



filterEventsService: async (filters) => {

    const { title, minPrice, maxPrice } = filters;

    // Fetch events using optional filters
    const events = await sequelize.query(
        `SELECT *
         FROM events
         WHERE title ILIKE :title
         AND (:minPrice IS NULL OR price >= :minPrice)
         AND (:maxPrice IS NULL OR price <= :maxPrice)
         ORDER BY created_at DESC`,
        {
            replacements: {
                title: "%" + (title || "") + "%",
                minPrice: minPrice === undefined || minPrice === "" ? null : Number(minPrice),
                maxPrice: maxPrice === undefined || maxPrice === "" ? null : Number(maxPrice)
            },
            type: sequelize.QueryTypes.SELECT
        }
    );

    const eventsResponse = [];

    for (const event of events) {

        // Fetch event images
        const images = await EventImage.findAll({
            where: { eventId: event.event_id },
            attributes: ["eventImageId", "imageUrl"]
        });

        // Count event bookings
        const bookingsCount = await Booking.count({
            where: { eventId: event.event_id }
        });

        // Calculate remaining seats
        const remainingSeats = event.capacity - bookingsCount;

        const eventResponse = {
            eventId: event.event_id,
            organizerId: event.organizer_id,
            title: event.title,
            description: event.description,
            location: event.location,
            eventDate: event.event_date,
            price: event.price,
            capacity: event.capacity,
            remainingSeats: remainingSeats,
            images: []
        };

        for (const image of images) {
            eventResponse.images.push(image.toJSON());
        }

        eventsResponse.push(eventResponse);
    }

    return eventsResponse;
},





isEventEndedService: async (eventId) => {
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    const currentDate = new Date();

    if (event.eventDate <= currentDate) {
        return { isEnded: true };
    }

    return { isEnded: false };
},


};

module.exports = eventService;
