
import express from 'express';
import userController from '../controllers/userController';

const router = express.Router(); //模块化路由

router.post("/register", userController.register);

router.post("/login", userController.login);


export default router;

