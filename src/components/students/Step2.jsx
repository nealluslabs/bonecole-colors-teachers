import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, TextareaAutosize, Typography, Button, MenuItem, Select} from '@mui/material';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '1px solid #00000026',
      padding: '10px',
      borderRadius: '8px',
      // marginRight: theme.spacing(2),
      width: '100%',
      minWidth: '100%',
      '& .MuiInputBase-input': {
        color: 'grey',
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'grey',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
      },
    },
    searchButton: {
      color: '#fff',
      padding: '15px',
      minWidth: '45%',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));
  

const Step2 = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        fname:  "",
        lname: "",
        gender: "",
       
      })
  

const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }


    return (
    <div className={classes.root}>
  <Grid container spacing={4}>
  <Grid item xs={6}>
      <Typography variant="subtitle1">Blood Group</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Blood Group
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Religion</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Religion
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Phone Number</Typography>
      <TextField
        name="phone"
        type='number'
        placeholder="+234 903825810"
        fullWidth
        value={state.lname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Email Address</Typography>
      <TextField
        name="phone"
        type='email'
        placeholder="Enter Email"
        fullWidth
        value={state.lname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Skin Colour</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Skin Colour
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Eye Colour</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Eye Colour
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Height</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Height
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Nationality</Typography>
      <Select
        value={state.gender}
        onChange={handleChange}
        displayEmpty
        label=""
        fullWidth
        sx={{
          backgroundColor: 'white',
          minWidth: 120,
          p: 1,
        }}
      >
        <MenuItem value="">
          Select Nationality
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    
    <Grid item xs={6}>
      <Typography variant="subtitle1">Admission Date</Typography>
      <TextField
        name="lname"
        placeholder="02/12/2020"
        fullWidth
        value={state.lname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Admission Terminated</Typography>
      <TextField
        name="lname"
        placeholder="02/12/2020"
        fullWidth
        value={state.lname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle1">Medical History</Typography>
      <TextField
          name="lname"
          placeholder="Give detailed info"
          fullWidth
          multiline
          rows={4} // Set the initial number of rows
          maxRows={6} // Set the maximum number of rows
          value={state.lname}
          onChange={handleChange}
          className={classes.searchInput}
          InputProps={{
            disableUnderline: true,
            style: {
              minHeight: '100px', // Set the minHeight to your desired value
              fontSize: '16px',
              padding: '8px',
            //   border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical', // Allow vertical resizing
            },
          }}
        />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle1">Any Special Instruction</Typography>
      <TextField
          name="lname"
          placeholder="Give detailed info"
          fullWidth
          multiline
          rows={4} // Set the initial number of rows
          maxRows={6} // Set the maximum number of rows
          value={state.lname}
          onChange={handleChange}
          className={classes.searchInput}
          InputProps={{
            disableUnderline: true,
            style: {
              minHeight: '100px', // Set the minHeight to your desired value
              fontSize: '16px',
              padding: '8px',
            //   border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical', // Allow vertical resizing
            },
          }}
        />
    </Grid>

  </Grid>
</div>

    );
  };

  export default Step2;