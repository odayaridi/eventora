const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email'
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'username'
    },

    phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    field: "phone_number"
},
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password'
    },
    roleName: {
        type: DataTypes.ENUM('EVENT_ORGANIZER', 'ATTENDEE'),
        allowNull: false,
        field: 'role_name'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    updatedAt: false
});

module.exports = User;