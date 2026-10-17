const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Event = require("./Event");
const User = require("./User");

const EventReview = sequelize.define('EventReview', {
    reviewId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'review_id'
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'event_id',
        unique: 'uq_attendee_event_review',
        references: {
            model: 'events',
            key: 'event_id'
        },
        onDelete: 'CASCADE'
    },
    attendeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'attendee_id',
        unique: 'uq_attendee_event_review',
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rating',
        validate: {
            min: 1,
            max: 5
        }
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'feedback'
    }
}, {
    tableName: 'event_reviews',
    timestamps: true,
    underscored: true       // createdAt -> created_at, updatedAt -> updated_at
});

EventReview.belongsTo(Event, { as: 'event', foreignKey: 'eventId', targetKey: 'eventId', onDelete: 'CASCADE' });
EventReview.belongsTo(User, { as: 'attendee', foreignKey: 'attendeeId', targetKey: 'userId' });

module.exports = EventReview;