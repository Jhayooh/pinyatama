import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Typography, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/MailOutline';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';


const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});



function Profile({ user, farm }) {
    return (
        <Container>
            <Paper
                variant='elevation'
                elevation={3}
                sx={{
                    display: 'flex',
                    height: '100%',
                    width: '70%',
                    boxShadow: '0px 3px 6px rgba(0, 255, 0, 0.5)',

                }} >

                {/* Farm Info */}

                <Box sx={{ display: 'flex', flexDirection: 'column', height: '500px', width: '700px', justifyContent: 'center' }}>
                    <Typography variant='h6'
                        sx={{
                            color: 'green',
                            fontFamily: 'monospace',
                            paddingLeft: 5
                        }}>
                        IMPORMASYON NG BUKID</Typography>

                    <Grid container spacing={3} sx={{ padding: 2, }}>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="first-name" sx={{ fontWeight: 'bold' }}>
                                Pangalan ng Magsasaka
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.farmerName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '300px' }}
                            />
                        </FormGrid>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="Gender" sx={{ fontWeight: 'bold' }}>
                                Kasarian
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.sex}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '100px' }}
                            />
                        </FormGrid>

                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="brgy" sx={{ fontWeight: 'bold' }} >
                                Baranggay
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.brgy}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '800' }}

                            />
                        </FormGrid>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="mun" sx={{ fontWeight: 'bold' }} >
                                Municipality
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.mun}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '800' }}
                            />
                        </FormGrid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="plants" sx={{ fontWeight: 'bold' }} >
                                Bilang ng Tanim
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.plantNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '800' }}

                            />
                        </FormGrid>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="area" sx={{ fontWeight: 'bold' }} >
                                Land Area
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.area}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ minWidth: '800' }}
                            />
                        </FormGrid>
                    </Grid>
                </Box>
            </Paper>

            <Paper
                variant='elevation'
                elevation={5}
                sx={{
                    display: 'flex',
                    height: '500px',
                    width: '30%',
                    flexDirection: 'column',
                    boxShadow: '0px 3px 6px rgba(0, 255, 0, 0.5)'
                }}>
                {/* Profile Info */}
                <Box>
                    <Typography
                        sx={{
                            color: 'green',
                            fontFamily: 'monospace',
                            paddingLeft:5,
                            paddingTop:5,
                        }}>
                        BARANGAY EXTENSIONIST</Typography>

                    <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 2, marginLeft: 5 }}>


                        <Avatar
                            src={user.photoURL}
                            alt="Profile"
                            sx={{
                                alignItems: 'center',
                                width: 150,
                                height: 150
                            }} />
                        <Typography
                            variant='h6'
                            component='h6'
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'orange'
                            }}>
                            {user.displayName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, marginRight: 2, fontWeight: 'bold' }}>
                            Barangay:
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom>
                            {user.brgy}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 2 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, marginRight: 2, fontWeight: 'bold' }}
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
                        {/* <EmailIcon sx={{ color: 'blue', marginRight: 1 }} /> */}
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, marginRight: 2, fontWeight: 'bold' }}>
                            Email:
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {user.email}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, marginRight: 2, fontWeight: 'bold' }}>
                            Phone Number:
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom>
                            {user.phoneNumber}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
