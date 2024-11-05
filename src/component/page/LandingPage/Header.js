import React from 'react'
import './css/style.css'
import { Box } from '@mui/material'

const Header = () => {
    return (
        <header id="header">
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 0,
                        paddingTop: '56.25%', // Aspect ratio: 16:9
                        // overflow: 'hidden',
                    }}
                >
                    <img
                        src={require('../../image_src/banner.png')}
                        alt="pineapple"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            </div>
        </header>
    )
}

export default Header