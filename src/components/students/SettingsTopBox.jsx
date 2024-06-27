import React, { useState} from 'react';
import Box from '@mui/material/Box';
import {Stepper, Step, StepButton, TextField, Button, Divider, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2'; // Import Step2 component
import Step3 from './Step3'; // Import Step3 component
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStudent, uploadDocImages } from 'src/redux/actions/student.action';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { saveNewPassword } from 'src/redux/reducers/settings.slice';

const steps = ['Basic Info', 'Additional Info', 'Doc Uploads'];

export default function SettingsTopBox() {


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '0px solid #00000026',
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

  const [studentPassportFile, setStudentPassportFile] = useState({selectedFile: [], selectedFileName: []});
  const [anotherFieldFile, setAnotherFieldFile] = useState({selectedFile: [], selectedFileName: []});
  const [mothersIdFile, setMothersIdFile] = useState({selectedFile: [], selectedFileName: []});
  const [certificateFile, setCertificateFile] = useState({selectedFile: [], selectedFileName: []});
  const [medicalRecordFile, setMedicalFile] = useState({selectedFile: [], selectedFileName: []});


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
  


  const { newPassword } = useSelector((state) => state.settings);

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
              <b>{'Set Password'}</b>
            
            </Typography>
            {/*<Divider />*/}
            <br />
            
            <Grid container spacing={4} style={{display:"flex",justifyContent:"center",gap:"2rem"}}>
        <Grid item xs={5}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>Old Password</Typography>
          <TextField
            name="fname"
            placeholder="Old Password"
            fullWidth
            value={state.fname}
            onChange={handleChange}
            className={classes.searchInput}
           
            InputProps={{
              
              style:{
               
                width:"100%",
                height:"3rem",
                backgroundColor:"white",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>New Password</Typography>
          <TextField
            name="lname"
            placeholder="New Password"
            fullWidth
            value={newPassword}
            onChange={(event)=>{dispatch(saveNewPassword(event.target.value))}}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style:{
                height:"3rem",
                backgroundColor:"white",
                width:"100%",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />
         </Grid>
        </Grid>

            <br/><br />
           
          </>
        )}

      </div>
    </Box>
  );
}
