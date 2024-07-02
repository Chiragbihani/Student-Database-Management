import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // Add other fields as needed
});

export default user;
