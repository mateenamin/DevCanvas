import {Router} from 'express';
import {signUser,loginUser , getProfile ,logout } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';
const router = Router(); 



router.post('/signup' , signUser )
router.post('/login' , loginUser )
router.get('/profile', protectRoute, getProfile)
router.post('/logout', logout)


export default router;
