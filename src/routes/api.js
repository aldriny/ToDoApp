import express from 'express';
import LoginController from '../controllers/auth/LoginController.js';
import RegisterController from '../controllers/auth/RegisterController.js';
import LogoutController from '../controllers/auth/LogoutController.js';

import authenticate from '../milddleware/authenticate.js';
import CreateListController from '../controllers/list/CreateListController.js';
import ReadListsController from '../controllers/list/ReadListsController.js';

const route = express.Router();

// ----------------- Auth routes -----------------
route.post('/register', RegisterController);
route.post('/login', LoginController);
route.get('/logout', LogoutController);

// ----------------- List routes -----------------
route.post('/create-list', authenticate, CreateListController);
route.get('/lists', authenticate, ReadListsController);



export default route;
