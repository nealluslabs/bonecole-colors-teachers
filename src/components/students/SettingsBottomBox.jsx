import React, { useState} from 'react';
import Box from '@mui/material/Box';
import {Stepper, Step, StepButton, TextField, Button, Divider, Grid, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2'; // Import Step2 component
import Step3 from './Step3'; // Import Step3 component
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStudent, uploadDocImages } from 'src/redux/actions/student.action';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { saveThemeColor, saveThemeImage,saveThemeColorUnsaved, saveThemeImageUnsaved,  saveThemeImageBlob } from 'src/redux/reducers/settings.slice';
import BONLOGO from 'src/assets/images/logo.png'

const steps = ['Basic Info', 'Additional Info', 'Doc Uploads'];


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
    padding: '0px',
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

export default function SettingsBottomBox() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [state, setState] = useState({
    fname:  "",
    lname: "",
    dob: "",
    gender: "",
    studentshipType: "",
    registrationId: "",
    class: "",
    section: "",
    guardianName: "",
    bloodGroup: "",
    religion: "",
    phoneNumber: "",
    email: "",
    skinColor: "",
    eyeColor: "",
    height: "",
    nationality: "",
    admissionDate: "",
    admissionTerminated: "",
    medicalHistory: "",
    specialInstruction: ""
  })


  const [selectedFile4, setSelectedFile4] = useState({selectedFile: [], selectedFileName: []});
const [file4, setFile4] = useState();
const handleselectedFile4 = event => {
  setSelectedFile4({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile4(URL.createObjectURL(event.target.files[0]));

dispatch(saveThemeImageUnsaved(URL.createObjectURL(event.target.files[0])))
dispatch(saveThemeImageBlob(event.target.files[0]))
};

  const [studentPassportFile, setStudentPassportFile] = useState({selectedFile: [], selectedFileName: []});
  const [anotherFieldFile, setAnotherFieldFile] = useState({selectedFile: [], selectedFileName: []});
  const [mothersIdFile, setMothersIdFile] = useState({selectedFile: [], selectedFileName: []});
  const [certificateFile, setCertificateFile] = useState({selectedFile: [], selectedFileName: []});
  const [medicalRecordFile, setMedicalFile] = useState({selectedFile: [], selectedFileName: []});

  const [surveyAnswer,setSurveyAnswer] = useState('')


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  const handleStudentPassportFile = event => {
    setStudentPassportFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleAnotherFieldFile = event => {
    setAnotherFieldFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleMothersIdFile = event => {
    setMothersIdFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleCertificateFile = event => {
    setCertificateFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleMedicalFile = event => {
    setMedicalFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};


  // Helper function to render the appropriate step content based on the activeStep
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 state={state} handleChange={handleChange} />;
      case 1:
        return <Step2 state={state} handleChange={handleChange} />;
      case 2:
        return <Step3 
        studentPassportFile={studentPassportFile}
        handleStudentPassportFile={handleStudentPassportFile}
        anotherFieldFile={anotherFieldFile}
        handleAnotherFieldFile={handleAnotherFieldFile}
        mothersIdFile={mothersIdFile}
        handleMothersIdFile={handleMothersIdFile}
        certificateFile={certificateFile}
        handleCertificateFile={handleCertificateFile}
        medicalRecordFile={medicalRecordFile}
        handleMedicalFile={handleMedicalFile}
        />;
      default:
        return 'Unknown step';
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const files = [
      studentPassportFile.selectedFile,
      anotherFieldFile.selectedFile,
      mothersIdFile.selectedFile,
      certificateFile.selectedFile,
      medicalRecordFile.selectedFile,
    ].filter(file => file); 
    
    try {
      setLoading(true);
     const urls = await Promise.all(files.map((file) => {
        if (file) {
          return dispatch(uploadDocImages(file));
        }
        return null;
      }));

  
      const [studentPassportFileUrl, anotherFieldFileUrl, mothersIdFileUrl, certificateFileUrl, medicalRecordFileUrl] = urls;
  
      const studentData = { state,  studentPassportFileUrl, anotherFieldFileUrl, mothersIdFileUrl, certificateFileUrl, medicalRecordFileUrl};
      dispatch(createStudent(studentData, navigate, setLoading));
    } catch (error) {
      // setLoading(false);
      console.error("Error uploading images: ", error);
      // notifyErrorFxn("Error occured uploading Images");
    }
  };
  

  return (
    <Box sx={{ width: '100%' }}>
    {/*  <div style={{ display: 'flex', width: '100%' }}>
  <div style={{ flex: 1 }}>
    <Stepper nonLinear activeStep={activeStep} style={{ border: '0px solid red', background: 'white' }}>
      {steps.map((label, index) => (
        <Step key={label} completed={completed[index]}>
          <StepButton color="inherit" onClick={handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  </div>
</div> */}

      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1, py: 1, ml: 5, color: '#000000', fontSize: '18px' }}>
              <b>{activeStep === 0 && 'Preferences'}</b>
            </Typography>
           {/*<Divider />*/}
            <br />
            {/* Render the appropriate step content */}
            <Grid container style={{display:"flex",justifyContent:"center",gap:"2rem"}}  spacing={4}>
        <Grid item xs={5}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>Color</Typography>
          {/*<TextField
            name="fname"
            placeholder="Color"
            fullWidth
            value={state.fname}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
                
              style:{
               
                width:"100%",
                height:"3rem",
                backgroundColor:"white",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />*/}


        


   {<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.4rem",width:"100%",padding:"10px",height:"3rem", border:"1px solid lightgrey",}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },

          style:{
               
            width:"100%",
            height:"3rem",
            backgroundColor:"white",
            border:"0px solid lightgrey",
            padding:"10px"
          }
      }}
        
          labelId="hi-label"
          id="hi"
          value={surveyAnswer}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Pick a Color</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setSurveyAnswer(event.target.value === "#FFC300" ? "Yellow":event.target.value === "#D72A34"?"Red":event.target.value ==="#0096FF" && "Blue");
            dispatch(saveThemeColorUnsaved(event.target.value));
          }}
        >
       
    <MenuItem disabled value="">Pick a Color</MenuItem> 
  <MenuItem  value={"#FFC300"}>Yellow</MenuItem>
  <MenuItem   value={"#D72A34"}>Red</MenuItem>
  <MenuItem   value={"#0096FF"}>Blue</MenuItem>
  
 


       
        </Select>
        }




        </Grid>
        <Grid item xs={5} style={{position:"relative"}}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>Logo</Typography>
          <TextField
            name="lname"
            placeholder="Logo"
            component="label"
            fullWidth
            value={state.lname}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,

                
              style:{
               
                width:"100%",
                height:"3rem",
                backgroundColor:"white",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />

          <div style={{backgroundColor:"white",height:"2rem",width:"5.3rem",position:"absolute",top:"5rem",left:"2.1rem",zIndex:"2"}}></div>
           
                <input
                  type="file"
                  style={{ display: 'flex',width:"100%",position:"relative",top:"-2rem",left:"0.2rem",opacity:!selectedFile4.selectedFileName?"0":"1",fontFamilt:"Arial" }}
                  onChange={handleselectedFile4}
                   />
        

         </Grid>
        </Grid>



            <br/><br />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
               <Button
                variant="contained"
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
                style={{
                  display: activeStep === 0 ? 'none' : 'inline-block',
                  minWidth: '125px',
                  backgroundColor: 'transparent',
                  border: '1px solid #000000',
                  color: '#000000',
                  marginLeft: '4rem',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  paddingLeft: '20px',
                }}
              >
                Previous
              </Button>

              

              </Grid>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
