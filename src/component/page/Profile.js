import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import EmailIcon from '@mui/icons-material/MailOutline';
import { useResolvedPath } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Profile({ user }) {

    return (
        <div style={{ display: 'flex' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,

                    },
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>

                    <Paper
                        variant='elevation'
                        elevation={3}
                        sx={{
                            display: 'flex',
                            height: '500px',
                            width: '700px',
                            boxShadow: '0px 3px 6px rgba(0, 255, 0, 0.5)'
                        }} >
                        <Grid container spacing={3} sx={{padding:10}}>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="first-name" required>
                                    First name
                                </FormLabel>
                                <TextField
                                    id="outlined-read-only-input"
                                    defaultValue="Hello World"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ minWidth: '800' }}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="last-name" required>
                                    Last name
                                </FormLabel>
                                <TextField
                                    id="outlined-read-only-input"
                             
                                    defaultValue="Hello World"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ minWidth: '800' }}
                                />
                            </FormGrid>

                        </Grid>
                    </Paper>


                    <Paper
                        variant='elevation'
                        elevation={3}
                        sx={{
                            display: 'flex',
                            height: '500px',
                            width: '300px',
                            flexDirection: 'column',
                            boxShadow: '0px 3px 6px rgba(0, 255, 0, 0.5)'
                        }}>
                        <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Avatar
                                src={user.photoURL}
                                alt="Profile"
                                sx={{
                                    alignItems: 'center',
                                    marginTop: 5,
                                    width: 150,
                                    height: 150
                                }} />
                            <Typography
                                variant='h6'
                                component='h6'
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                {user.displayName}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{ marginRight: 2 }}>
                                Barangay:
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom>
                                {user.brgy}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                            >
                                Municipality:
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom>
                                {user.mun}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 2 }}>
                            <EmailIcon sx={{ color: 'blue', marginRight: 1 }} />
                            <Typography variant="subtitle2" gutterBottom>
                                Email:
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                {user.email}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{ marginRight: 2 }}>
                                Phone Number:
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom>
                                {user.phoneNumber}
                            </Typography>
                        </Box>
                    </Paper>
                </div>



            </Box>
        </div>
        // <div>
        //     <Box
        //         component="form"
        //         sx={{
        //             '& .MuiTextField-root': { m: 1, width: '25ch' },
        //         }}
        //         noValidate
        //         autoComplete="off"
        //     >
        //         <Grid container spacing={2}>
        //             <Grid item xs={12} sm={9}>
        //                 <TextField
        //                     id="outlined-read-only-input"
        //                     label="Farmer Name"
        //                     defaultValue="Hello World"
        //                     InputProps={{
        //                         readOnly: true,
        //                     }}
        //                     sx={{minWidth:'800'}}
        //                 />
        //             </Grid>
        //             <Grid item xs={12} sm={3}>
        //                 <TextField
        //                     id="outlined-read-only-input"
        //                     label="Sex"
        //                     defaultValue="Hello World"
        //                     InputProps={{
        //                         readOnly: true,
        //                     }}
        //                 />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <TextField
        //                     id="outlined-read-only-input"
        //                     label="Address"
        //                     defaultValue="Hello World"
        //                     InputProps={{
        //                         readOnly: true,
        //                     }}
        //                 />
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </div>
    );
};

export default Profile;
