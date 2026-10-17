const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");
const HttpError = require("../utils/HttpError");

const bookingService = {

    fetchEventAttendeesService: async (eventTitle) => {

        // Find event by exact title
        const event = await Event.findOne({
            where: { title: eventTitle }
        });

        if (!event) {
            throw new HttpError("Event not found", 404);
        }

        // Fetch all bookings for this event
        const bookings = await Booking.findAll({
            where: { eventId: event.eventId },
            order: [["bookedAt", "DESC"]]
        });

        const attendees = [];

        for (const booking of bookings) {

            // Fetch attendee details
            const user = await User.findByPk(booking.attendeeId);

            if (user) {

                attendees.push({
                    bookingId: booking.bookingId,
                    bookedAt: booking.bookedAt,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    phoneNumber: user.phoneNumber
                });

            }
        }

        return attendees;
    },




    bookEventService: async (userId, eventId) => {

    // Check user
    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    // Check attendee role
    if (user.roleName !== "ATTENDEE") {
        throw new HttpError("User is not an attendee", 403);
    }

    // Check event
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    // Check if attendee already booked this event
    const existingBooking = await Booking.findOne({
        where: {
            attendeeId: userId,
            eventId: eventId
        }
    });

    if (existingBooking) {
        throw new HttpError("You have already booked this event", 409);
    }

    // Count existing bookings
    const bookingsCount = await Booking.count({
        where: { eventId: eventId }
    });

    // Check available seats
    if (bookingsCount >= event.capacity) {
        throw new HttpError("Event is fully booked", 400);
    }

    // Create booking
    const booking = await Booking.create({
        attendeeId: userId,
        eventId: eventId
    });

    return booking;
},




isEventBookedByAttendeeService: async (userId, eventId) => {

    // Check user
    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    // Check attendee role
    if (user.roleName !== "ATTENDEE") {
        throw new HttpError("User is not an attendee", 403);
    }

    // Check event
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    // Check booking
    const booking = await Booking.findOne({
        where: {
            attendeeId: userId,
            eventId: eventId
        }
    });

    if (booking) {
        return { isBooked: true };
    }

    return { isBooked: false };
},



isEventFullService: async (eventId) => {

    // Check event
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    // Count existing bookings
    const bookingsCount = await Booking.count({
        where: { eventId: eventId }
    });

    // Check if event is full
    if (bookingsCount >= event.capacity) {
        return { isFull: true };
    }

    return { isFull: false };
},


fetchAttendeeBookingsService: async (userId) => {

    // Check user
    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    // Check attendee role
    if (user.roleName !== "ATTENDEE") {
        throw new HttpError("User is not an attendee", 403);
    }

    // Fetch attendee bookings
    const bookings = await Booking.findAll({
        where: { attendeeId: userId },
        order: [["bookedAt", "DESC"]]
    });

    const bookingsResponse = [];

    for (const booking of bookings) {

        // Fetch event details
        const event = await Event.findByPk(booking.eventId);

        if (event) {

            bookingsResponse.push({
                bookingId: booking.bookingId,
                title: event.title,
                description: event.description,
                location: event.location,
                eventDate: event.eventDate,
                bookedAt: booking.bookedAt
            });

        }
    }

    return bookingsResponse;
},



deleteBookingService: async (userId, eventId) => {

    // Check user
    const user = await User.findByPk(userId);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    // Check attendee role
    if (user.roleName !== "ATTENDEE") {
        throw new HttpError("User is not an attendee", 403);
    }

    // Check event
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new HttpError("Event not found", 404);
    }

    // Check if attendee booked this event
    const booking = await Booking.findOne({
        where: {
            attendeeId: userId,
            eventId: eventId
        }
    });

    if (!booking) {
        throw new HttpError("Booking not found for this attendee and event", 404);
    }

    // Delete booking
    await booking.destroy();

    return { message: "Booking deleted successfully" };
},


};

module.exports = bookingService;