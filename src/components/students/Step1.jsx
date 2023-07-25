import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Typography, Button, MenuItem, Select} from '@mui/material';
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
  

const Step1 = () => {
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
      <Typography variant="subtitle1">First Name</Typography>
      <TextField
        name="fname"
        placeholder="First name"
        fullWidth
        value={state.fname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Last Name</Typography>
      <TextField
        name="lname"
        placeholder="Last name"
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
      <Typography variant="subtitle1">Date Of Birth</Typography>
      <TextField
        name="lname"
        placeholder="01/01/1999"
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
      <Typography variant="subtitle1">Gender</Typography>
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
          Select Gender
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Registration ID</Typography>
      <TextField
        name="lname"
        placeholder="00037278488"
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
      <Typography variant="subtitle1">Gender</Typography>
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
          Boarding
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Class</Typography>
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
          Select Class
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Section</Typography>
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
          Select Section
        </MenuItem>
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={2}>Female</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1">Guardian Name (if any)</Typography>
      <TextField
        name="lname"
        placeholder="Enter name"
        fullWidth
        value={state.lname}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
  </Grid>
</div>

    );
  };

  export default Step1;