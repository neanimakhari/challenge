import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

// Enable CORS for React frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Allow all origins in development
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Root route with API usage examples
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the User-Task Management API',
        api_usage: {
            'Create a User': {
                endpoint: 'POST /users',
                example_request: {
                    curl: 'curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d \'{"name": "John Doe", "email": "john@example.com"}\'',
                    body: {
                        name: "John Doe",
                        email: "john@example.com"
                    }
                },
                example_response: {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com"
                }
            },
            'List All Users': {
                endpoint: 'GET /users',
                example_request: {
                    curl: 'curl http://localhost:3000/users'
                },
                example_response: [{
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                    tasks: []
                }]
            },
            'Create a Task': {
                endpoint: 'POST /users/:id/tasks',
                example_request: {
                    curl: 'curl -X POST http://localhost:3000/users/1/tasks -H "Content-Type: application/json" -d \'{"title": "Complete Project", "description": "Finish the REST API implementation"}\'',
                    body: {
                        title: "Complete Project",
                        description: "Finish the REST API implementation"
                    }
                },
                example_response: {
                    id: 1,
                    title: "Complete Project",
                    description: "Finish the REST API implementation",
                    completed: false
                }
            },
            'List User Tasks': {
                endpoint: 'GET /users/:id/tasks',
                example_request: {
                    curl: 'curl http://localhost:3000/users/1/tasks'
                },
                example_response: [{
                    id: 1,
                    title: "Complete Project",
                    description: "Finish the REST API implementation",
                    completed: false
                }]
            }
        }
    });
});

// Routes
app.use('/users', userRoutes);

// Database initialization and server start
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    }); 