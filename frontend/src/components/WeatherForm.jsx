// src/components/WeatherForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './WeatherForm.css';

const WeatherForm = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/weather/${city}/`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found');
            setWeather(null);
        }
    };

    return (
        <div className='w'>
            <h1>WEATHER PREDICTION</h1>
        <div className="weather-form" >
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div>
                    <h2>Weather in {weather.city}</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default WeatherForm;
