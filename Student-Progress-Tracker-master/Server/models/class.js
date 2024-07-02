import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure the path to db.js is correct

const Class = sequelize.define('Class', {
    className: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sem: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject5: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'class_data', // This is the equivalent of collection name in MongoDB
    timestamps: false // Disable createdAt and updatedA
});

export default Class;