import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper'

function Profile({ avatar }) {
    // const [avatar, setAvatar] = useState

    return (
        <div style={{ backgroundColor: '#fff', display: 'flex' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,

                    },
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Paper variant='elevation' elevation={3} sx={{ display: 'flex', height: '500px', width: '700px' }} />
                    <Paper variant='elevation' elevation={3} sx={{ display: 'flex', height: '500px', width: '300px' }}>
                    <Avatar sx={{ backgroundColor: 'orange', textAlign: 'center', padding: 10, display: 'flex', alignItems: 'center' }}>Profile</Avatar>

                        {/* <Avatar src={avatar.photoURL} alt="Profile" /> */}
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
