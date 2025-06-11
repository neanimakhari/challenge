import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WeatherInfo from './components/WeatherInfo';
import { api } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await api.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Please refresh the page.');
      }
    };
    fetchUsers();
  }, []);

  // Fetch tasks when a user is selected
  useEffect(() => {
    const fetchTasks = async () => {
      if (selectedUserId) {
        try {
          const fetchedTasks = await api.getUserTasks(selectedUserId);
          setTasks(fetchedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          alert('Failed to fetch tasks. Please try again.');
        }
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [selectedUserId]);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = async (taskId) => {
    try {
      const updatedTask = tasks.find(task => task.id === taskId);
      if (updatedTask) {
        // Note: You'll need to implement this endpoint in your API
        // await api.updateTask(selectedUserId, taskId, { completed: !updatedTask.completed });
        setTasks(tasks.map(task =>
          task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
        ));
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <h2>Users</h2>
          <UserForm onUserAdded={handleUserAdded} />
          <UserList
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
          <WeatherInfo />
        </Col>
        <Col md={6}>
          {selectedUser && (
            <>
              <h2>Tasks for {selectedUser.name}</h2>
              <TaskForm
                userId={selectedUserId}
                onTaskAdded={handleTaskAdded}
              />
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
