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

function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}


function Profile({ user, farm }) {
    return (
        <Grid container spacing={2} alignItems='stretch' sx={{ padding: 2, height: '100%', overflow: 'hidden', display: 'flex' }}>
            <Grid item xs={12} md={8}  >
                <Box
                    sx={{
                        boxShadow: 2,
                        borderRadius: 4,
                        backgroundColor: '#e8f5e9',
                        height: '100%',
                        padding: 3,
                        // maxWidth: 800,
                        margin: 'auto',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ textAlign: 'center', color: '#2e7d32', fontWeight: 'bold', marginBottom: 2, fontFamily:'serif' }}
                    >
                        Detalye ng Sakahan
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', gap:1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c', }}>
                                    Field I.D
                                </Typography>
                                <TextField
                                    id="farmer-name"
                                    defaultValue={farm.fieldId}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '20px',
                                            height: '50%',
                                            paddingX:2,
                                            paddingY:1
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', gap:1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Status
                                </Typography>
                                <Typography sx={{
                                    backgroundColor: farm.remarks ? farm.remarks === 'failed'
                                        ? 'red'
                                        : farm.remarks === 'On going'
                                            ? 'orange'
                                            : 'green'
                                        : 'green',
                                    color: '#fff', paddingX: 2, paddingY: 1, borderRadius: 3, textAlign: 'center',
                                    fontSize: 18, fontWeight: 600
                                }}>{farm.remarks.toUpperCase()}</Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c', }}>
                                    Pangalan ng Magsasaka
                                </Typography>
                                <TextField
                                    id="farmer-name"
                                    defaultValue={farm.farmerName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Kasarian
                                </Typography>
                                <TextField
                                    id="sex"
                                    defaultValue={farm.sex}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Baranggay
                                </Typography>
                                <TextField
                                    id="barangay"
                                    defaultValue={farm.brgy}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Munisipalidad
                                </Typography>
                                <TextField
                                    id="municipality"
                                    defaultValue={farm.mun}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Petsa ng Pagtanim
                                </Typography>
                                <TextField
                                    id="land-area"
                                    defaultValue={dateFormatter(farm.start_date)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Petsa ng Inaasahang Ani
                                </Typography>
                                <TextField
                                    id="plant-number"
                                    defaultValue={farm.isEthrel ? dateFormatter(farm.harvest_date) : dateFormatter(farm.harvest_date)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Sukat ng Lupa
                                </Typography>
                                <TextField
                                    id="land-area"
                                    defaultValue={`${farm.area} Ha`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Bilang ng Tanim
                                </Typography>
                                <TextField
                                    id="plant-number"
                                    defaultValue={`${farm.plantNumber} pcs`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    NPK
                                </Typography>
                                <TextField
                                    id="npk"
                                    defaultValue={farm.npk}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="button" sx={{ color: '#388e3c' }}>
                                    Klase ng Lupa
                                </Typography>
                                <TextField
                                    id="soil-type"
                                    defaultValue={farm.soil}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiFilledInput-root:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '16px',
                                            height: '50%',
                                        },
                                        borderRadius: 1,

                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} >
                <Box sx={{
                    boxShadow: 1,
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    height: '100%',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h6 style={{ textAlign: 'center' }}>Barangay Extensionist Worker</h6>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 2,
                        alignItems: 'center',
                    }}>
                        <Avatar
                            src={user.photoURL}
                            alt="Profile"
                            sx={{
                                alignItems: 'center',
                                width: 200,
                                height: 200
                            }} />
                        <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: '#000000', mt: 2
                            }}>
                            {user.displayName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <p>Baranggay:</p>
                            <p>Munisipalidad:</p>
                            <p>Username:</p>
                            <p>Contact Number:</p>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <p>{user.brgy}</p>
                            <p>{user.mun}</p>
                            <p>{user.email}</p>
                            <p>{user.phoneNumber}</p>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            {/* <Grid item xs={12} md={8} lg={8} elevation={3} sx={{ padding: 3, boxShadow: 1, backgroundColor: '#fff'}}>
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
            </Grid> */}
        </Grid>
    );
};

export default Profile;
