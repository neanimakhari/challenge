import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const userController = new UserController();
const taskController = new TaskController();

// User routes
router.get('/', userController.getAllUsers.bind(userController));
router.post('/', userController.createUser.bind(userController));

// Task routes for specific user
router.get('/:id/tasks', taskController.getTasksByUserId.bind(taskController));
router.post('/:id/tasks', taskController.createTask.bind(taskController));

export default router; 