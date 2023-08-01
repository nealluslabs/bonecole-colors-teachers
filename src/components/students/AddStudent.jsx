import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2'; // Import Step2 component
import Step3 from './Step3'; // Import Step3 component

const steps = ['Basic Info', 'Additional Info', 'Doc Uploads'];

export default function AddStudent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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

  // Helper function to render the appropriate step content based on the activeStep
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return 'Unknown step';
    }
  };

   const handleSave = () => {

   }

  return (
    <Box sx={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%' }}>
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
  <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
    <Button
      variant="contained"
      style={{
        minWidth: '125px',
        backgroundColor: 'transparent',
        border: '1px solid #392751',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '20px',
        color: '#392751'
      }}
    >
      Edit
    </Button>
    <Button
      variant="contained"
      style={{
        minWidth: '125px',
        backgroundColor: '#D72A34',
        marginLeft: '1rem',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '20px',
        color: 'white'
      }}
    >
      Delete Info
    </Button>
  </div>
</div>

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1, ml: 5, color: '#392751', fontSize: '18px' }}>
              <b>{activeStep === 0 && 'Basic Information'}</b>
              <b>{activeStep === 1 && 'Additional Information'}</b>
              <b>{activeStep === 2 && 'Document Uploads'}</b>
            </Typography>
            <Divider />
            <br />
            {/* Render the appropriate step content */}
            {getStepContent(activeStep)}
            <br/><br />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
               <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{
                  display: activeStep === 0 ? 'none' : 'inline-block',
                  minWidth: '125px',
                  backgroundColor: 'transparent',
                  border: '1px solid #962DFF',
                  color: '#962DFF',
                  marginLeft: '4rem',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  paddingLeft: '20px',
                }}
              >
                Previous
              </Button>

                {activeStep === 2 ? <Button variant="contained" onClick={handleSave} style={{ minWidth: '125px', backgroundColor: "#762AD7", marginLeft: activeStep === 0 ? '4rem' : '1rem', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
                Save
              </Button> :
              <Button variant="contained" onClick={handleNext} style={{ minWidth: '125px', backgroundColor: "#762AD7", marginLeft: activeStep === 0 ? '4rem' : '1rem', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
              Next
            </Button>}

              </Grid>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
