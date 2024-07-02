import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import userRoutes from './routes/user.js'; // Adjust routes as needed
import classRoutes from './routes/class.js'; // Adjust routes as needed
import studentRoutes from './routes/student.js'; // Adjust routes as needed

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/user", userRoutes); // Adjust route usage as per your application
app.use("/class", classRoutes); // Adjust route usage as per your application
app.use("/student", studentRoutes); // Adjust route usage as per your application

app.get("/", (req, res) => {
    res.send("Student Progress Analyzer API");
});

const PORT = process.env.PORT || 3000;

const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
  // Your MySQL connection details
  host: 'localhost',
  user: 'root',
  password: 'mysql@123',
  database: 'student'
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password; // **Insecure! Don't use raw password!**

  // **Highly insecure! Use prepared statements to prevent SQL injection!**
  pool.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    res.json({ success: true }); // Assuming successful login response
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));


const corsOptions = {
    origin: ['http://localhost:3000', 'https://student-progress-tracker.netlify.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
  
  app.use(cors(corsOptions));
  
  // Your routes and other middleware setup here
  
  app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });
