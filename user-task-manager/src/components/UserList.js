import React, { useState } from 'react';
import { ListGroup, Form, Pagination, Row, Col } from 'react-bootstrap';

const ITEMS_PER_PAGE = 5;

const UserList = ({ users, selectedUserId, onSelectUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Check
            type="switch"
            id="sort-order"
            label={`Sort ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}
            checked={sortOrder === 'desc'}
            onChange={toggleSortOrder}
          />
        </Col>
      </Row>

      <ListGroup className="mb-3">
        {paginatedUsers.map(user => (
          <ListGroup.Item
            key={user.id}
            active={user.id === selectedUserId}
            onClick={() => onSelectUser(user.id)}
            style={{ cursor: 'pointer' }}
          >
            <div>{user.name}</div>
            <small className="text-muted">{user.email}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {totalPages > 1 && (
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
  );
};

export default UserList; 