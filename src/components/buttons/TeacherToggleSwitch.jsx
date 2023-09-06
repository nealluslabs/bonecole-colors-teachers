import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const TeacherToggleSwitch = ({activeButton, setActiveButton, handleOne, handleTwo}) => {


  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '4px',
        backgroundColor: '#F9F9F9',
      }}
    >
      <Button
        variant={activeButton === '1' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '180px',

          
          backgroundColor: activeButton === '1' ? ' #D72A34' : 'transparent',
          color: activeButton === '1' ? '#fff' : ' #D72A34',
          border: 'none',
          borderRadius: '20px',
          marginRight: '4px',
        }}
        onClick={handleOne}
      >
        View Teachers
      </Button>
      <Button
        variant={activeButton === '2' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '180px',
          backgroundColor: activeButton === '2' ? ' #D72A34' : 'transparent',
          color: activeButton === '2' ? '#fff' : ' #D72A34',
          border: 'none',
          borderRadius: '20px',
        }}
        onClick={handleTwo}
      >
        Add Teachers
      </Button>
    </Box>
  );
};

export default TeacherToggleSwitch;
