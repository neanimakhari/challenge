import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
    private taskService = new TaskService();

    async getTasksByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);
            const tasks = await this.taskService.getTasksByUserId(userId);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    }

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);
            const { title, description } = req.body;
            
            if (!title || !description) {
                res.status(400).json({ error: 'Title and description are required' });
                return;
            }

            const task = await this.taskService.createTask(userId, { title, description });
            res.status(201).json(task);
        } catch (error) {
            if (error instanceof Error && error.message === 'User not found') {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(500).json({ error: 'Error creating task' });
            }
        }
    }
} 