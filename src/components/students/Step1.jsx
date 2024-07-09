import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, Select, MenuItem } from '@mui/material';
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

const Step1 = ({state, handleChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Prenom</Typography>
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
          <Typography variant="subtitle1">Nom de Famille</Typography>
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
          <Typography variant="subtitle1">Date de Naissance</Typography>
          <TextField
            type="date"
            name="dob"
            placeholder="01/01/1999"
            fullWidth
            value={state.dob}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Genre</Typography>
          <select
            name="gender"
            value={state.gender}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Registration ID</Typography>
          <TextField
            name="registrationId"
            type="number"
            placeholder="00037278488"
            fullWidth
            value={state.registrationId}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        {/*<Grid item xs={6}>
          <Typography variant="subtitle1">Studentship Type</Typography>
          <select
            name="studentshipType"
            value={state.studentshipType}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value=""></option>
            <option value="Male">Boarding</option>
            <option value="Female">Day</option>
          </select>
          </Grid> */}
        <Grid item xs={6}>
          <Typography variant="subtitle1">Classe</Typography>
          <select
            name="class"
            value={state.class}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
           <option value="">Sélectionner une Classe</option>
            <option value="Level 1">Niveau 1</option>
            <option value="Level 2">Niveau 2</option>
            <option value="Level 3">Niveau 3</option>
            <option value="Level 4">Niveau 4</option>
            <option value="Level 5">Niveau 5</option>
            <option value="Level 6">Niveau 6</option>
            <option value="Level 7">Niveau 7</option>
            <option value="Level 8">Niveau 8</option>
            <option value="Level 9">Niveau 9</option>
           <option value="Level 10">Niveau 10</option>
           <option value="Level 11">Niveau 11</option>
           <option value="Level 12">Niveau 12</option>
           <option value="Level 13">Niveau 13</option>
          </select>
        </Grid>
        {/*<Grid item xs={6}>
          <Typography variant="subtitle1">Section</Typography>
          <select
            name="section"
            value={state.section}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </Grid>*/}
       {/* <Grid item xs={6}>
          <Typography variant="subtitle1">Guardian Name (if any)</Typography>
          <TextField
            name="guardianName"
            placeholder="Enter name"
            fullWidth
            value={state.guardianName}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
          </Grid>*/}
      </Grid>
    </div>
  );
};

export default Step1;
