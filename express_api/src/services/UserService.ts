import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(userData: { name: string; email: string }): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ 
            where: { id },
            relations: ['tasks']
        });
    }
} 