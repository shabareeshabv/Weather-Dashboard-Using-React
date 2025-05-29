import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();
const API_KEY = 'fd776ec86c3b5a74a0b3cd522de09a31'; // Your actual API key

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(() => {
    return localStorage.getItem('lastCity') || '';
  });

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(cityName);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (!city) return;

    const intervalId = setInterval(() => {
      fetchWeather(city);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [city]);

  useEffect(() => {
    if (city) fetchWeather(city);
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, error, city, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
