import express from "express"
import { teacherSignup, teacherLogin } from "../controllers/teacher.js"


const router = express.Router()

router.post('/teacher-signup', teacherSignup)
router.post('/teacher-login', teacherLogin)

import express from 'express';
import User from '../models/User.js';



// Create a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Other routes...

export default router;


