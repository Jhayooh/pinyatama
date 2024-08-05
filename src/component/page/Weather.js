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

        return `${dayOfWeek}\n ${month}  ${day} ${year}`;
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

    // const weatherConditions = {
    //     Rain: {
    //         color: '#005BEA',
    //         title: 'Raining',
    //         subtitle: 'Get a cup of coffee',
    //         icon: 'weather-rainy'
    //     },
    //     Clear: {
    //         color: '#f7b733',
    //         title: 'So Sunny',
    //         subtitle: 'It is hurting my eyes',
    //         icon: 'weather-sunny'
    //     },
    //     Thunderstorm: {
    //         color: '#616161',
    //         title: 'A Storm is coming',
    //         subtitle: 'Because Gods are angry',
    //         icon: 'weather-lightning'
    //     },
    //     Clouds: {
    //         color: '#1F1C2C',
    //         title: 'Clouds',
    //         subtitle: 'Everywhere',
    //         icon: 'weather-cloudy'
    //     },
    //     Snow: {
    //         color: '#00d2ff',
    //         title: 'Snow',
    //         subtitle: 'Get out and build a snowman for me',
    //         icon: 'weather-snowy'
    //     },
    //     Drizzle: {
    //         color: '#076585',
    //         title: 'Drizzle',
    //         subtitle: 'Partially raining...',
    //         icon: 'weather-hail'
    //     },
    //     Haze: {
    //         color: '#66A6FF',
    //         title: 'Haze',
    //         subtitle: 'Another name for Partial Raining',
    //         icon: 'weather-hail'
    //     },
    //     Mist: {
    //         color: '#3CD3AD',
    //         title: 'Mist',
    //         subtitle: "Don't roam in forests!",
    //         icon: 'weather-fog'
    //     }
    // };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: 2,
            flexDirection: 'column',
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
                            flexDirection: { xs: 'column', md: 'row' },
                            boxShadow: 2,
                            backgroundColor: '#28B463',
                            //backgroundColor: weatherConditions[weather.current.weather[0].main]?.color || '#fff',
                            gap: 5,
                            justifyContent: 'space-evenly',
                            padding: 2,
                        }}>
                            <Box>
                                <img
                                    className=""
                                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                                    alt={weather.current.weather[0].description}
                                    width='100%'
                                    height='200px'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                                <Typography variant='h3' sx={{ marginLeft: 5, color: 'white' }}>
                                    {Math.round(weather.current.main.temp)}
                                    <sup className="deg">°C</sup>
                                </Typography>
                                <Typography variant='h6' sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
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

                    <Grid item xs={12} lg={12} >
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, }}>
                            {weather.forecast.map((item, index) => (
                                <Box key={index}
                                    sx={{
                                        textAlign: 'center',
                                        backgroundColor: '#fff',
                                        padding: 3,
                                        boxShadow: 2,
                                        // flex: '1 1 auto',
                                        // margin: 1,
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
