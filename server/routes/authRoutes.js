    import express from 'express';
    import { loginUser, registerUser, addEvent, getAllEvents } from '../controllers/authController.js';



    const router = express.Router();

    router.post('/login', loginUser);
    router.post('/register', registerUser); // ✅ यही जोड़ा जाए

    // Event Management Routes
    router.post('/events', addEvent);         // Add new event
    router.get('/events', getAllEvents);      // Get all events


    export default router;
