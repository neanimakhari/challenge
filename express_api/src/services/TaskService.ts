import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

export class TaskService {
    private taskRepository = AppDataSource.getRepository(Task);
    private userRepository = AppDataSource.getRepository(User);

    async getTasksByUserId(userId: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }

    async createTask(userId: number, taskData: { title: string; description: string }): Promise<Task> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        const task = this.taskRepository.create({
            ...taskData,
            user
        });
        return this.taskRepository.save(task);
    }
} 