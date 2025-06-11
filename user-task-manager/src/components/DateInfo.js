import React, { useState, useEffect } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import { getDateInfo } from '../services/dateService';
import moment from 'moment';

const DateInfo = () => {
  const [dateInfo, setDateInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDateInfo = async () => {
    try {
      const info = await getDateInfo();
      setDateInfo(info);
      setError('');
    } catch (err) {
      setError('Failed to fetch date information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDateInfo();
    // Update every minute
    const interval = setInterval(fetchDateInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mb-4">
        {error}
      </Alert>
    );
  }

  if (!dateInfo) {
    return null;
  }

  const formattedDate = moment(dateInfo.datetime).format('MMMM D, YYYY');
  const formattedTime = moment(dateInfo.datetime).format('h:mm A');

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Location Time & Date</h4>
      </Card.Header>
      <Card.Body>
        <div className="mb-3 text-center">
          <h2 className="mb-0 display-4">{formattedTime}</h2>
          <div className="text-muted fs-5">{formattedDate}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 mb-2">
            <strong>Location:</strong>
            <div className="text-primary">{dateInfo.requested_location}</div>
          </div>
          <div className="col-sm-6 mb-2">
            <strong>Timezone:</strong>
            <div className="text-primary">{dateInfo.timezone}</div>
          </div>
          <div className="col-sm-6 mb-2">
            <strong>Timezone Name:</strong>
            <div className="text-primary">{dateInfo.timezone_name}</div>
          </div>
          <div className="col-sm-6 mb-2">
            <strong>Latitude:</strong>
            <div className="text-primary">{dateInfo.latitude}°</div>
          </div>
          <div className="col-sm-6 mb-2">
            <strong>Longitude:</strong>
            <div className="text-primary">{dateInfo.longitude}°</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DateInfo; 