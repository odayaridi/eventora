const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Event = require("./Event");

const EventImage = sequelize.define('EventImage', {
    eventImageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'event_image_id'
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'event_id',
        references: {
            model: 'events',
            key: 'event_id'
        },
        onDelete: 'CASCADE'
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'image_url'
    }
}, {
    tableName: 'event_images',
    timestamps: true,
    underscored: true,
    updatedAt: false        // event_images has no updated_at
});

EventImage.belongsTo(Event, { as: 'event', foreignKey: 'eventId', targetKey: 'eventId', onDelete: 'CASCADE' });

module.exports = EventImage;