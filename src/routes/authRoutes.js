import express from 'express';
import { register, login, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

// Endpoint: POST http://localhost:5000/api/auth/register
router.post('/register', register);
// Endpoint: POST http://localhost:5000/api/auth/login
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/verify-email', verifyEmail);
export default router;