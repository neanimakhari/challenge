import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Task } from "../entities/Task";

async function viewDatabase() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log("Database connection established");

        // Get all users with their tasks
        const users = await AppDataSource.getRepository(User).find({
            relations: ['tasks']
        });

        console.log("\n=== Database Contents ===\n");
        
        if (users.length === 0) {
            console.log("No users found in the database.");
        } else {
            console.log(`Found ${users.length} users:\n`);
            users.forEach(user => {
                console.log(`User ID: ${user.id}`);
                console.log(`Name: ${user.name}`);
                console.log(`Email: ${user.email}`);
                console.log("Tasks:");
                if (user.tasks && user.tasks.length > 0) {
                    user.tasks.forEach(task => {
                        console.log(`  - [${task.completed ? 'X' : ' '}] ${task.title}`);
                        console.log(`    Description: ${task.description}`);
                    });
                } else {
                    console.log("  No tasks");
                }
                console.log("-------------------");
            });
        }

    } catch (error) {
        console.error("Error viewing database:", error);
    } finally {
        // Close the database connection
        await AppDataSource.destroy();
    }
}

// Run the function
viewDatabase(); 