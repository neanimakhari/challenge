import axios from 'axios';

const API_KEY = '3e63ba183faef870c22e846af3f53457'; // OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherInfo = async (city = 'Los Angeles') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use metric units (Celsius)
      }
    });

    const data = response.data;
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      windSpeed: data.wind.speed,
      datetime: new Date(),
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Error fetching weather info:', error);
    throw error;
  }
}; 