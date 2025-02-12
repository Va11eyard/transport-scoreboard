import React, { useEffect, useState } from 'react';
import { getWeather } from '../services/weather';
import { Weather } from '../types';

const WeatherDisplay: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  
  useEffect(() => {
    getWeather().then(setWeather);
  }, []);
  
  if (!weather) return <div>Loading weather...</div>;
  
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl">Current Weather</h2>
      <p>Condition: {weather.condition}</p>
      <p>Temperature: {weather.temperature} °C</p>
    </div>
  );
};

export default WeatherDisplay;
