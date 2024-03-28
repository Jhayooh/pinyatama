import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Logo from '../component/image_src/pinyatamap-logo.png';
import { auth } from '../firebase/Config';

function Login({ navItems }) {
    const [loginModalDisplay, setLoginModalDisplay] = useState(false);
    const [registerModalDisplay, setRegisterModalDisplay] = useState(false);
    const modalRef = useRef(null);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const openLoginModal = () => {
        setLoginModalDisplay(true);
    };

    const closeLoginModal = () => {
        setLoginModalDisplay(false);
    };

    const openRegisterModal = () => {
        setRegisterModalDisplay(true);
    };

    const closeRegisterModal = () => {
        setRegisterModalDisplay(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleOutsideClick = (event) => {
        if (event.target === modalRef.current) {
            closeLoginModal();
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const defaultTheme = createTheme();

    return (
        <>

            <div>
                <nav className="navbar " style={{ alignItems: 'center' }} >
                    <div className="nav-logo-container">
                        <img src={Logo} alt="" />
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <button
                            className="primary-button"
                            type="button"
                            onClick={openLoginModal}
                            style={{ color: '#22b14c' }}
                        >Login</button>
                    </div>
                </nav>


                {/* Login Modal */}
                {/* {loginModalDisplay && (
                
                <div
                ref={modalRef}
                onClick={handleOutsideClick}
                 className="modal" style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '9999',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <form className="modal-content animate" onSubmit={handleSubmit}>
                        <div className="imgcontainer">
                            <span
                                onClick={closeLoginModal}
                                className="close"
                                title="Close "
                                style={{ color: 'black', with: 30, }}
                            >
                                &times;
                            </span>
                        </div>
                        <h1 style={{ color: 'orange' }}>MALIGAYANG PAGDATING!</h1>
                        <h5 style={{alignItems:'center'}}>Mag-login sa iyong account</h5>
                        <div className="container">
                            <ThemeProvider theme={defaultTheme}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                        </Typography>
                                        <Box component="form" noValidate sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                style={{ backgroundColor: 'orange' }}
                                            >
                                                Sign In
                                            </Button>
                                            <Grid container>
                                                
                                                <Grid item>
                                                    <Link href="#" variant="body2" onClick={openRegisterModal}>
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Container>
                            </ThemeProvider>
                        </div>
                    </form>
                </div>
            )} */}

                {/* Register Modal */}
                {registerModalDisplay && (
                    <div className="modal" style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '9999',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}>
                        <form className="modal-content animate" onSubmit={handleSubmit}>
                            <div className="imgcontainer">
                                <span
                                    onClick={closeRegisterModal}
                                    className="close"
                                    title="Close "
                                    style={{ color: 'black', with: 30, }}
                                >
                                    &times;
                                </span>
                            </div>
                            {/* Your Register form content here */}
                            <h1 style={{ color: 'orange' }}>MALIGAYANG PAGDATING!</h1>
                            <h5 style={{ alignItems: 'center' }}>Mag-rehistro ng iyong account</h5>
                            <div className="container">
                                <ThemeProvider theme={defaultTheme}>
                                    <Container component="main" maxWidth="xs">
                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                                                <LockOutlinedIcon />
                                            </Avatar>
                                            <Typography component="h1" variant="h5">
                                                Sign in
                                            </Typography>
                                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoComplete="given-name"
                                                            name="firstName"
                                                            required
                                                            fullWidth
                                                            id="firstName"
                                                            label="First Name"
                                                            autoFocus
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="lastName"
                                                            label="Last Name"
                                                            name="lastName"
                                                            autoComplete="family-name"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    autoFocus
                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox value="remember" color="primary" />}
                                                    label="Remember me"
                                                />
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    style={{ backgroundColor: 'orange' }}
                                                >
                                                    Sign Up
                                                </Button>

                                            </Box>
                                        </Box>
                                    </Container>
                                </ThemeProvider>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <Modal
                open={loginModalDisplay}
                onClose={closeLoginModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '9999',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
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
                        color="secondary"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        focused />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        label="Password"
                        color="secondary"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        focused />
                    <Button
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: 'orange' }}
                        onClick={handleLogin}

                    >
                        Sign In
                    </Button>

                    {/* <form className="modal-content animate" onSubmit={handleSubmit}>
                        <div className="imgcontainer">
                            <span
                                onClick={closeLoginModal}
                                className="close"
                                title="Close "
                                style={{ color: 'black', with: 30, }}
                            >
                                &times;
                            </span>
                        </div>
                        <h1 style={{ color: 'orange' }}>MALIGAYANG PAGDATING!</h1>
                        <h5 style={{ alignItems: 'center' }}>Mag-login sa iyong account</h5>
                        <div className="container">
                            <ThemeProvider theme={defaultTheme}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                        </Typography>
                                        <Box component="form" noValidate sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                label="Email"
                                                color="secondary"
                                                value={email}
                                                onChange={(event) => { setEmail(event.target.value) }}
                                                focused />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                label="Password"
                                                color="secondary"
                                                value={password}
                                                onChange={(event) => { setPassword(event.target.value) }}
                                                focused />
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                style={{ backgroundColor: 'orange' }}
                                                onClick={handleLogin}

                                            >
                                                Sign In
                                            </Button>
                                            <Grid container>

                                                <Grid item>
                                                    <Link href="#" variant="body2" onClick={openRegisterModal}>
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Container >
                            </ThemeProvider >
                        </div >
                    </form >  */}

                </Box >
            </Modal >
        </>
    );
}

export default Login;
