import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure the path to db.js is correct

const Teacher = sequelize.define('Teacher', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quote: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'teacher_data', // This is the equivalent of the collection name in MongoDB
    timestamps: false // Disable createdAt and updatedAt timestamps if not needed
});

export default Teacher;

