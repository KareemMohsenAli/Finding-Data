import express from 'express';  
import * as authContoller from './contoller/auth.js';
import { validation } from '../../middleware/validation.js';
import { login, signUp } from './contoller/validation.js';
const router=express.Router();

router.post('/register',validation(signUp),authContoller.Register);
router.post('/login',validation(login),authContoller.logIn);

export default router