import React from 'react';
import { Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import styleVariables from "../../styles/main.scss";

function NotFound() {
    return (
        <Box
        sx={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0px',
            left: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: styleVariables.backgroundColor1,
            opacity: '0.7'
        }}>
            <Typography 
             variant='h2'
             sx={{
                color: styleVariables.mainColor1,
            }}>
                Page Not Found!
            </Typography>
            <Link 
              to='/'
              style={{
                marginBottom: '70px'
              }}>
                Go Back
            </Link>

        </Box>
    )
}

export default NotFound;