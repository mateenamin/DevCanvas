import {Router} from 'express';
import { signupUser } from '../controllers/auth.controller.js';

const router = Router(); 



router.post('/signup' , signupUser )


export default router;
