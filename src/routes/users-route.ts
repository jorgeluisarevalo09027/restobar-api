import express from 'express';
import { loginLimiter } from '../helpers/auth';
import usersControllers from '../controllers/users-controller'

const route = express.Router();

route.post('/register', usersControllers.register);
route.post('/login',loginLimiter,usersControllers.login);

export default route;