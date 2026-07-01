import {Router} from 'express';
import {signUser,loginUser } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';
const router = Router(); 



router.post('/signup' , signUser )
router.post('/login' , loginUser )
router.get('/profile', protectRoute, (req, res) => {
    res.json({ 
        message: "Welcome to your profile!", 
        userId: req.userId 
    });
});


export default router;
