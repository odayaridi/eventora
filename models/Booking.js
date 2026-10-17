const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Event = require("./Event");

const Booking = sequelize.define('Booking', {
    bookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'booking_id'
    },
    attendeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'attendee_id',
        unique: 'uq_attendee_event',
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'event_id',
        unique: 'uq_attendee_event',
        references: {
            model: 'events',
            key: 'event_id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'bookings',
    timestamps: true,
    underscored: true,
    createdAt: 'bookedAt',  // maps to booked_at
    updatedAt: false
});

Booking.belongsTo(User, { as: 'attendee', foreignKey: 'attendeeId', targetKey: 'userId' });
Booking.belongsTo(Event, { as: 'event', foreignKey: 'eventId', targetKey: 'eventId', onDelete: 'CASCADE' });

module.exports = Booking;