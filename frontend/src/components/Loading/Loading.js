import React from 'react';
import {Box, CircularProgress} from '@mui/material';

import styleVariables from "../../styles/main.scss";

const Loading = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '7',
            opacity: '0.5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <CircularProgress sx={{color: styleVariables.mainColor1}}/>
        </Box>
    )
}

export default Loading;