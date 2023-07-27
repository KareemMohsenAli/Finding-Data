import express from 'express';  
import * as userController from "./contoller/user.js"
import { auth } from '../../middleware/auth.js';
const router=express.Router();

router.get('/', (req, res,next) => {
    res.send('Hello World!');
});
router.put('/updateuser',auth,userController.updateUser);
router.get('/search',auth,userController.searchByIPAndName);
router.put('/logout',auth,userController.logout);

export default router