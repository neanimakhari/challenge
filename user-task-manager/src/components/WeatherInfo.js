import React, { useState, useEffect } from 'react';
import { Card, Alert, Spinner, Form, Button } from 'react-bootstrap';
import { getWeatherInfo } from '../services/weatherService';
import moment from 'moment';

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Los Angeles');

  const fetchWeatherInfo = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const info = await getWeatherInfo(cityName);
      setWeatherData(info);
    } catch (err) {
      setError('Failed to fetch weather information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherInfo(city);
    // Update every 10 minutes
    const interval = setInterval(() => fetchWeatherInfo(city), 600000);
    return () => clearInterval(interval);
  }, [city]);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeatherInfo(city);
  };

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

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Weather Information</h4>
        <span>{moment(weatherData.datetime).format('h:mm A')}</span>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleCitySubmit} className="mb-4">
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </div>
        </Form>

        <div className="text-center mb-4">
          <h2 className="mb-0">
            {weatherData.city}, {weatherData.country}
          </h2>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              style={{ width: '100px', height: '100px' }}
            />
            <div className="display-4">{weatherData.temperature}°C</div>
          </div>
          <div className="text-capitalize text-muted">
            {weatherData.description}
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <Card className="h-100">
              <Card.Body>
                <h6 className="mb-2">Feels Like</h6>
                <div className="text-primary">{weatherData.feels_like}°C</div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card className="h-100">
              <Card.Body>
                <h6 className="mb-2">Humidity</h6>
                <div className="text-primary">{weatherData.humidity}%</div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card className="h-100">
              <Card.Body>
                <h6 className="mb-2">Wind Speed</h6>
                <div className="text-primary">{weatherData.windSpeed} m/s</div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card className="h-100">
              <Card.Body>
                <h6 className="mb-2">Sunrise / Sunset</h6>
                <div className="text-primary">
                  {moment(weatherData.sunrise).format('h:mm A')} /{' '}
                  {moment(weatherData.sunset).format('h:mm A')}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherInfo; 