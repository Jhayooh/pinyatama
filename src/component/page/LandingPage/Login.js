import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/Config';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            signOut(auth);
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const newAuth = getAuth();
    const handleLogin = async () => {
        setIsLoading(true);
        setError('');

        const adminEmails = ["qpcamarinesnorte@gmail.com"];

        try {
            const userCredential = await signInWithEmailAndPassword(newAuth, email, password);
            const user = userCredential.user;
            if (adminEmails.includes(user.email)) {
                navigate('/');
            } else {
                setError("Access denied: You do not have admin privileges.");
                newAuth.signOut();
            }
        } catch (loginError) {
            setError("The Email/Password you've entered is incorrect.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #40a040, #209020)',
                // background:'green',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid
                container
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 4,
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                            width: '100%',
                            maxWidth: 450,
                            margin: 'auto',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleLogin();
                        }}
                    >
                        <img
                            src={require('../../image_src/pinyatamap-logo.png')}
                            alt="Logo"
                            style={{
                                width: '80px',
                                height: '80px',
                                marginBottom: '20px',
                                filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "'Pacifico', cursive",
                                color: '#52be80',
                                marginBottom: '10px',
                                fontSize: 30,
                                fontWeight: 600,
                            }}
                        >
                            Queen Pineapple Farming
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                color: '#333333',
                                marginBottom: '20px',
                            }}
                        >
                            Welcome Back!
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            color="success"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            sx={{
                                marginBottom: '15px',
                                backgroundColor: '#f8f8f8',
                                borderRadius: 2,
                            }}
                        />
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            variant="outlined"
                            color="success"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleLogin();
                                }
                            }}
                            sx={{
                                marginBottom: '15px',
                                backgroundColor: '#f8f8f8',
                                borderRadius: 2,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        {error && (
                            <Typography
                                color="error"
                                sx={{
                                    marginBottom: '20px',
                                    fontWeight: 600,
                                    fontSize: '12px',
                                    textAlign: 'center',
                                }}
                            >
                                {error}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <Button
                                type="button"
                                variant="outlined"
                                color="error"
                                sx={{
                                    flex: 1,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={isLoading}
                                sx={{
                                    flex: 2,
                                    backgroundColor: '#52be80',
                                    '&:hover': {
                                        backgroundColor: '#68c690',
                                    },
                                    borderRadius: 2,
                                    textTransform: 'none',
                                }}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>
                        <Copyright sx={{ marginTop: 3 }} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
