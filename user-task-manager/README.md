# User Task Manager

A React application for managing users and their tasks. This application provides a clean interface for creating users and managing their tasks with features like validation, pagination, sorting, and searching.

## Features

- User Management
  - Create new users with name and email
  - Input validation for user creation
  - Search users by name or email
  - Sort users alphabetically
  - Paginated user list

- Task Management
  - Create tasks for selected users
  - Mark tasks as complete/incomplete
  - View tasks per user
  - Input validation for task creation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API Integration

The application integrates with a REST API running at `http://localhost:5000`. Make sure the API server is running before using the application.

### API Endpoints

- Users
  - `GET /users` - Get all users
  - `POST /users` - Create a new user
  - `GET /users/:userId/tasks` - Get tasks for a specific user
  - `POST /users/:userId/tasks` - Create a task for a specific user

## Testing

Run the test suite:

```bash
npm test
```

### Test Coverage

The application includes unit tests for:
- Form validation
- API integration
- Component rendering
- Error handling

## Project Structure

```
src/
├── components/          # React components
│   ├── UserForm.js     # User creation form
│   ├── UserList.js     # User list with pagination
│   ├── TaskForm.js     # Task creation form
│   └── TaskList.js     # Task list component
├── services/           # API and service functions
│   └── api.js         # API integration
├── utils/             # Utility functions
│   └── validation.js  # Form validation
└── App.js             # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
