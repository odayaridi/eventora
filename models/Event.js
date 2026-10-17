const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Event = sequelize.define('Event', {
    eventId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'event_id'
    },
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'organizer_id',
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'title'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'description'
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'location'
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'event_date'
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: 'price',
        validate: {
            min: 0
        }
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'capacity',
        validate: {
            min: 1
        }
    }
}, {
    tableName: 'events',
    timestamps: true,
    underscored: true       // createdAt -> created_at, updatedAt -> updated_at
});

Event.belongsTo(User, { as: 'organizer', foreignKey: 'organizerId', targetKey: 'userId' });

module.exports = Event;