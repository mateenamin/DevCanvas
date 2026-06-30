import { Router } from 'express';
import authRoutes from './auth.routes.js';

const router = Router();

// Saare routes yahan attach honge
router.use('/auth', authRoutes); // Iska matlab URL banega: /api/auth

export default router;
