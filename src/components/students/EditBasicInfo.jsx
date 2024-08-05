import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, Select, MenuItem } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';
import { deleteStudent } from 'src/redux/actions/student.action';
import { useNavigate } from 'react-router-dom';

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

const EditBasicInfo = ({state, handleChange, handleUpdate, loading}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { themeColor } = useSelector((state) => state.settings);
  const { user,school } = useSelector((state) => state.auth);


  useEffect(()=>{

 if(!themeColor){
 dispatch(saveThemeColor( school && school.settings &&  school.settings.themeColor))
 dispatch(saveThemeImage(school && school.settings &&  school.settings.themeImage))
 }


  },[])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="subtitle1">informations de base</Typography>
      <div>
        {/*<Button
          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor: 'transparent',
            border: '1px solid   #000000',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: '  #000000'
          }}
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? "Loading..." : "Cancel"}
        </Button>
        <Button
          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor:themeColor?themeColor: ' #D72A34',
            marginLeft: '1rem',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: 'white'
          }}
        >
          Submit
        </Button>*/}
      </div>
    </div>
     <br/>
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Prenom</Typography>
          <TextField
            name="fname"
            placeholder="Prenom"
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
            placeholder="Nom de Famille"
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
          <Typography variant="subtitle1">date de naissance</Typography>
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
          <Typography variant="subtitle1">ID d'enregistrement</Typography>
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
          </Grid>*/}
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

           {/* {Array.from({ length: 12 }, (_, index) => (
              <option tion key={`level-${index + 1}`} value={`Level ${index + 1}`}>
                Level {index + 1}
              </option>
            ))} */}
          </select>
        </Grid>

       {/* <Grid item xs={6}>
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

      {/*  <Grid item xs={6}>
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
          </Grid> */}
    <Grid style={{marginTop:"2rem",marginBottom:"1rem",marginLeft:"30px"}}>
     <Button
         onClick={()=>{dispatch(deleteStudent(state,navigate))}}
          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor: 'transparent',
            border: '1px solid #000000',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: '#000000'
          }}
          disabled={loading}
         
        >
          {loading ? "Chargement..." : "Supprimer"}
        </Button>
        <Button
         // onClick={()=>{dispatch(updateStudent(state))}}

          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor: themeColor?themeColor:"#D72A34",
            marginLeft: '1rem',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: 'white'
          }}
          onClick={handleUpdate}
        >
          Soumettre
        </Button>
     </Grid>

      </Grid>
    </div>
    </>
  );
};

export default EditBasicInfo;
