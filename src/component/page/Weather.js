import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid, Typography } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Weather = ({ farm }) => {
    const [weather, setWeather] = useState({
        loading: false,
        current: {},
        forecast: [],
        error: false,
    });

    const apiKey = '3e16842f99dedf74a6cb7daabcdfafb8';

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
        const dayOfWeek = weekDays[dateObj.getDay()];
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        return `${dayOfWeek}, ${day} ${month} ${year}`;
    };

    useEffect(() => {
        const fetchWeather = async () => {
            setWeather(prevState => ({ ...prevState, loading: true }));
            const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
            const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
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

                const dailyForecast = forecastRes.data.list.filter(item => new Date(item.dt_txt).getHours() === 12);

                setWeather({
                    current: currentWeatherRes.data,
                    forecast: dailyForecast,
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
            // boxShadow: 2,
            // backgroundColor: '#fff',
            padding: 2,
            // borderRadius: 4
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
                <Grid container >

                    <Grid item xs={12} lg={12} >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            boxShadow: 2,
                            backgroundColor: '#28B463',
                            gap: 5,
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{}}>
                                <img
                                    className=""
                                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                                    alt={weather.current.weather[0].description}
                                    width='100%'
                                    height='200px'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h3' sx={{ marginLeft: 5, color: 'white' }}>
                                    {Math.round(weather.current.main.temp)}
                                    <sup className="deg">°C</sup>
                                </Typography>
                                <Typography variant='h6' sx={{ color: 'white' }}>
                                    {weather.current.weather[0].description.toUpperCase()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <img src={require('../image_src/pin.png')} width='20px' height='20px' />
                                    <Typography variant='button' sx={{ color: 'white' }}>
                                        {weather.current.name}, Camarines Norte
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <img src={require('../image_src/calendar.png')} width='20px' height='20px' />
                                    <Typography variant='button' sx={{ color: 'white' }}>
                                        {toDateFunction()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <img src={require('../image_src/wind.png')} width='20px' height='20px' />
                                    <Typography variant='button' sx={{ color: 'white' }}>
                                        Wind Speed: {weather.current.wind.speed} m/s
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                    {/* {weather.current.coord && (
                        <Grid item xs={12} lg={6} sx={{ width: '500px', height: '280px', }}>
                            <MapContainer center={[weather.current.coord.lat, weather.current.coord.lon]} zoom={10} style={{ width: '100%', height: '100%' }}>
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                                // attribution='&copy; <a href="https://www.openweathermap.org/">OpenWeatherMap</a>'
                                />
                            </MapContainer>
                        </Grid>
                    )} */}

                    <Grid item xs={12} lg={12} >

                        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                            {weather.forecast.map((item, index) => (
                                <Box key={index}
                                    sx={{
                                        textAlign: 'center',
                                        // minWidth: '15%',
                                        backgroundColor: '#fff',
                                        padding: 3,
                                        boxShadow: 2
                                    }}>
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
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Weather;
