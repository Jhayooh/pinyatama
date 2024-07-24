import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';

const Weather = ({ farm }) => {
    const [weather, setWeather] = useState({
        loading: false,
        current: {},
        forecast: [],
        error: false,
    });

    const toDateFunction = (timestamp) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December',
        ];
        const weekDays = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday',
        ];
        const dateObj = timestamp ? new Date(timestamp * 1000) : new Date();
        const date = `${weekDays[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
        return date;
    };

    useEffect(() => {
        const fetchWeather = async () => {
            setWeather(prevState => ({ ...prevState, loading: true }));
            const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
            const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
            const apiKey = '3e16842f99dedf74a6cb7daabcdfafb8';
            const location = `${farm.mun}, PH`;

            try {
                const currentWeatherRes = await axios.get(currentWeatherUrl, {
                    params: {
                        q: location,
                        units: 'metric',
                        appid: apiKey,
                    },
                });

                const forecastRes = await axios.get(forecastUrl, {
                    params: {
                        q: location,
                        units: 'metric',
                        appid: apiKey,
                    },
                });

                setWeather({
                    current: currentWeatherRes.data,
                    forecast: forecastRes.data.list,
                    loading: false,
                    error: false,
                });
            } catch (error) {
                setWeather({ current: {}, forecast: [], loading: false, error: true });
                console.log('error', error);
            }
        };

        fetchWeather();
    }, [farm]);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            boxShadow: 2,
            backgroundColor: '#fff',
            padding: 2,
            borderRadius: 4
        }}>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>City not found</span>
                    </span>
                </>
            )}
            {weather.current.main && (
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#88C488',
                        padding: 2,
                        borderRadius: 4
                    }}>
                        <div className="city-name">
                            <h2>
                                {weather.current.name}, Camarines Norte 
                            </h2>
                        </div>
                        <div className="date">
                            <span>{toDateFunction()}</span>
                        </div>
                        <div className="icon-temp">
                            <img
                                className=""
                                src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                                alt={weather.current.weather[0].description}
                            />
                            {Math.round(weather.current.main.temp)}
                            <sup className="deg">°C</sup>
                        </div>
                        <div className="des-wind">
                            <p>{weather.current.weather[0].description.toUpperCase()}</p>
                            <p>Wind Speed: {weather.current.wind.speed} m/s</p>
                        </div>
                    </Box>
                    <div className="forecast">
                        <h3>5-Day Forecast (3-hour intervals)</h3>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'scroll' }}>
                            {weather.forecast.slice(0, 40).map((item, index) => (
                                <Box key={index} className="forecast-item" sx={{ textAlign: 'center', minWidth: '20%', backgroundColor:'#88C488' , borderRadius:4, padding:5}}>
                                    <div>{toDateFunction(item.dt)}</div>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt={item.weather[0].description}
                                    />
                                    <div>{Math.round(item.main.temp)}°C</div>
                                    <div>{item.weather[0].description.toUpperCase()}</div>
                                </Box>
                            ))}
                        </Box>
                    </div>
                </Box>
            )}
        </Box>
    );
};

export default Weather;
