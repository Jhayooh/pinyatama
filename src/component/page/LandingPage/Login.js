import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { signInWithEmailAndPassword } from 'firebase/auth';
import {signOut, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import { useEffect } from 'react';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://queenpineapple.lesterintheclouds.com/">
                Queen Pineapple Farming
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Login = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
          signOut(auth)
        }
        
      }, []);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [logged, setLogged] = useState(false)

    const handleClose = () => {
        setLogged(false);
    };

    const newAuth = getAuth();
    const handleLogin = async () => {
        setIsLoading(true);
        setError('');

        const adminEmails = ["admin@gmail.com"];

        try {
            const userCredential = await signInWithEmailAndPassword(newAuth, email, password);
            const user = userCredential.user;
            if (adminEmails.includes(user.email)) {
                console.log("Admin logged in successfully");
                navigate('/')
            } else {
                console.log("Access denied. Not an admin.");
                setError("Access denied: You do not have admin privileges.");
                newAuth.signOut();
            }
        } catch (loginError) {
            setError("Login failed: " + loginError.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id='#login' style={{
            height: '100vh', backgroundColor: '#e6f7e6', padding: 5, justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Grid
                container
                sx={{
                    // marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <Grid item lg={6} md={'none'} xs={'none'}>
                    <Box sx={{
                        width: "100%",
                        height: 300,
                        display: { xs: 'none', md: 'none', lg: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}>
                        <Paper elevation={3}
                            sx={{
                                position: 'absolute',
                                top: '10%',
                                left: '8%',
                                width: '22%',
                                height: '20%',
                                borderRadius: 15,
                                boxShadow: 2
                            }} >
                            <img
                                src={require('../image_src/pinya1.jpg')}
                                style={{ width: '100%', height: 300, borderRadius: 15 }}
                            />
                        </Paper>
                        <Paper elevation={3}
                            sx={{
                                position: 'absolute',
                                top: '32%',
                                left: '22%',
                                width: '22%',
                                height: '20%',
                                borderRadius: 15,
                                boxShadow: 2
                            }}  >
                            <img
                                src={require('../image_src/pinya4.jpg')}
                                style={{ width: '100%', height: 300, borderRadius: 15 }}
                            />
                        </Paper>
                        <Paper elevation={3}
                            sx={{
                                position: 'absolute',
                                top: '58%',
                                left: '10%',
                                width: '22%',
                                height: '20%',
                                borderRadius: 15,
                                boxShadow: 2
                            }}  >
                            <img
                                src={require('../image_src/pinya2.jpg')}
                                style={{ width: '100%', height: 300, borderRadius: 15 }}
                            />
                        </Paper>
                    </Box>
                </Grid > */}

                <Grid item lg={5} md={6} xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: { lg: '100%', xs: '100%', md: '80%' },
                            padding: 2,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                            boxShadow: 3,
                            marginTop: 5
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                mb: 2,
                            }}
                        >
                            {/* <Box sx={{
                      position: 'absolute',
                      top: {xs:'10%',sm:'12%',md:'4%', lg:'8%',xl:'3%'},
                      left:  {xs:'40%',sm:'70%',md:'43%', lg:'68%',xl:'70%'},
                    }}>
                      <img
                        src={require('../../image_src/pinyatamap-logo.png')}
                        style={{ width: "25%", height: 'auto' }}
                        alt="Logo"
                      />
                    </Box> */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}>
                                <img
                                    src={require('../../image_src/pinyatamap-logo.png')}
                                    style={{ width: "25%", height: 'auto' }}
                                    alt="Logo"
                                />
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'Georgia, serif',
                                        fontSize: { xs: 30, md: 60 },
                                        color: 'green',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        mt: 0
                                    }}
                                >
                                    QUEEN PINEAPPLE FARMING
                                </Typography>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: 30,
                                        color: 'green',
                                        fontFamily: 'monospace',
                                        mt: 2,
                                        mb: 2,
                                    }}
                                >
                                    Welcome Back!
                                </Typography>
                            </Box>

                            {/* Login Form */}
                            <Box sx={{
                                width: '100%',
                                paddingLeft: { xs: '5%', md: '10%' },
                                paddingRight: { xs: '5%', md: '10%' },
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Email"
                                    color="success"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    InputProps={{ style: { borderColor: 'green', borderRadius: 20, backgroundColor: '#e6f7e6' } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    label="Password"
                                    color="success"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    InputProps={{ style: { borderColor: 'green', borderRadius: 20, backgroundColor: '#e6f7e6' } }}
                                />

                                {/* Login Button */}
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Button
                                        type="submit"

                                        variant="outlined"
                                        color='error'
                                        sx={{
                                            mt: 3,
                                            padding: 1.5,
                                            width: '30%',
                                            borderRadius: { xs: 5, md: 10 }
                                        }}
                                    // onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color='success'
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'green',
                                            },
                                            mt: 3,
                                            padding: 1.5,
                                            width: '70%',
                                            borderRadius: { xs: 5, md: 10 }
                                        }}
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </Button>
                                </Box>


                                <Copyright sx={{ mt: { xs: 2, lg: 5 } }} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid >
        </div >
    )
}

export default Login