# Task Manager Application

A full-stack task management application built with React frontend and Express.js backend.

## Project Structure

- `express_api/` - Backend Express.js API
- `user_task_manager/` - React frontend application
- `docker-compose.yml` - Docker composition file for running both services

## Prerequisites

- Node.js v20 or later
- Docker and Docker Compose
- Git

## Development Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Install dependencies:
```bash
# Install backend dependencies
cd express_api
npm install

# Install frontend dependencies
cd ../user_task_manager/user-task-manager
npm install
```

3. Run with Docker:
```bash
# From the root directory
docker-compose up --build
```

## Accessing the Application

- Frontend: http://localhost
- Backend API: http://localhost:3007

## Deployment

1. Clone the repository on your server
2. Make sure Docker and Docker Compose are installed
3. Run `docker-compose up --build -d`

## Environment Variables

Create `.env` files in both frontend and backend directories if needed.

## License

[Your chosen license] 