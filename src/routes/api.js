import express from 'express';
import LoginController from '../controllers/auth/LoginController.js';
import RegisterController from '../controllers/auth/RegisterController.js';
import LogoutController from '../controllers/auth/LogoutController.js';

import authenticate from '../milddleware/authenticate.js';
import CreateListController from '../controllers/list/CreateListController.js';
import ReadListsController from '../controllers/list/ReadListsController.js';
import EditListController from '../controllers/list/EditListController.js';
import DeleteListController from '../controllers/list/DeleteListController.js';

import CreateTodoController from '../controllers/todo/CreateTodoController.js';
import EditTodoController from '../controllers/todo/EditTodoController.js';
import DeleteTodoController from '../controllers/todo/DeleteTodoController.js';

const route = express.Router();

// ----------------- Auth routes -----------------
route.post('/register', RegisterController);
route.post('/login', LoginController);
route.get('/logout', authenticate , LogoutController);

// ----------------- List routes -----------------
route.post('/create-list', authenticate, CreateListController);
route.get('/lists', authenticate, ReadListsController);
route.put('/edit-list/:listId', authenticate, EditListController);
route.delete('/delete-list/:listId', authenticate, DeleteListController);

// ----------------- Todo routes -----------------
route.post('/create-todo/:listId', authenticate, CreateTodoController);
route.put('/edit-todo/:listId', authenticate, EditTodoController);
route.delete('/delete-todo/:todoId', authenticate, DeleteTodoController);


export default route;
