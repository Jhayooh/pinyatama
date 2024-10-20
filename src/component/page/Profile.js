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
        <Grid container spacing={2} alignItems='stretch' sx={{ padding: 2, }}>
            <Grid item xs={12} md={8} lg={8} elevation={3} sx={{ padding: 3, boxShadow: 1, backgroundColor: '#fff'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center'}}>
                    <Typography variant='h6'
                        sx={{
                            color: 'green',
                            fontFamily: 'monospace',
                            paddingLeft: 2,
                            paddingTop: 2,
                        }}>
                        IMPORMASYON NG BUKID</Typography>
                    <Grid container spacing={3} sx={{ padding: 2, }}>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="first-name" sx={{ fontWeight: 'bold' }}>
                                Field ID
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.fieldId}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ display: 'flex' }}
                                fullWidth
                            // sx={{ minWidth: '300px' }}
                            />
                        </FormGrid>
                    </Grid>

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
                            // sx={{ minWidth: '300px' }}
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
                            //  sx={{ minWidth: '800' }}

                            />
                        </FormGrid>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="mun" sx={{ fontWeight: 'bold' }} >
                                Munisipalidad
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
                            //sx={{ minWidth: '800' }}

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
                            // sx={{ minWidth: '800' }}
                            />
                        </FormGrid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="plants" sx={{ fontWeight: 'bold' }} >
                                NPK
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.npk}
                                InputProps={{
                                    readOnly: true,
                                }}
                            //sx={{ minWidth: '800' }}

                            />
                        </FormGrid>
                        <FormGrid item xs={12} md={6}>
                            <FormLabel htmlFor="area" sx={{ fontWeight: 'bold' }} >
                                Klase ng Lupa
                            </FormLabel>
                            <TextField
                                id="outlined-read-only-input"
                                defaultValue={farm.soil}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // sx={{ minWidth: '800' }}
                            />
                        </FormGrid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4} elavation={3} sx={{ padding: 3, boxShadow: 2, backgroundColor: '#28B463' }}>
                <Box>
                    <Typography
                        sx={{
                            color: '#fff',
                            fontFamily: 'serif',
                            paddingLeft: 5,
                            paddingTop: 2,
                            fontSize: {xs:15, md:25}

                        }}>
                         Barangay Agricultural Extension Workers </Typography>

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
                                color: 'white'
                            }}>
                            {user.displayName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', md: 'row' }, gap: 2 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, fontWeight: 'bold' }}>
                            Baranggay:
                        </Typography>
                        <Typography
                            sx={{ color: 'white' }}
                            variant="subtitle2"
                            gutterBottom>
                            {user.brgy}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', md: 'row' }, gap: 2 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, fontWeight: 'bold' }}
                        >
                            Munisipalidad:
                        </Typography>
                        <Typography
                            sx={{ color: 'white' }}
                            variant="subtitle2"
                            gutterBottom>
                            {user.mun}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ marginLeft: 3, fontWeight: 'bold' }}>
                            Username:
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ color: 'white' }}>
                            {user.email}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            xs={12}
                            sx={{ marginLeft: 3, fontWeight: 'bold' }}>
                            Numero ng Telepono:
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            xs={12}
                            sx={{ color: 'white' }}>
                            {user.phoneNumber}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
