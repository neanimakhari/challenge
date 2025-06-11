import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService = new UserService();

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                res.status(400).json({ error: 'Name and email are required' });
                return;
            }
            const user = await this.userService.createUser({ name, email });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }
} 