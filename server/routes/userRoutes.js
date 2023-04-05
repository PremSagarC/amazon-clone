import express from 'express';
import protectRoute from '../authenticateMiddleware/Middleware.js';
import { loginUser, registerUser, updateUserProfile } from '../controllers/UserRoutes.js'

const router = express.Router();

// POST login method
router.post('/login', loginUser)

// Post register method
router.post('/register', registerUser)

// PUT update method
router.put('/profile/:id', (protectRoute, updateUserProfile))

export default router;