import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';

const TaskList = ({ tasks, onToggleTask }) => {
  return (
    <ListGroup>
      {tasks.map(task => (
        <ListGroup.Item key={task.id} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            label={task.description}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList; 