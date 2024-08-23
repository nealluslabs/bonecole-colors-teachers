import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStudentResult } from 'src/redux/actions/student.action';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';

const subjects = ['Mathematics', 'English', 'Biology', 'Physics', 'Home Keeping', 'Economics', 'Fine arts', 'French'];

const gradeRanges = [
  { range: [76, 100], grade: 'A' },
  { range: [70, 75], grade: 'B' },
  { range: [60, 69], grade: 'C' },
  { range: [55, 59], grade: 'D' },
  { range: [45, 54], grade: 'E' },
  { range: [0, 44], grade: 'F' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
  searchInput: {
    background: 'white',
    border: '1px solid black',
    padding: '10px',
    marginLeft: '10px',
    // justifyContent: 'center',
    borderRadius: '1px',
    width: '22%',
    height: '10%',
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
}));

const AssessmentReportForm = ({studentData}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [scores, setScores] = useState({});
  const [cumulative, setCumulative] = useState(0);
  const [loading, setLoading] = useState(false);



  const { themeColor } = useSelector((state) => state.settings);
  const {school } = useSelector((state) => state.auth);
  
  console.log("student data IS--->",studentData)

  console.log("school DEETS ARE-->",school)

  console.log("USER DEETS ARE-->",user)

  const [numberOfExamsToDisplay,setNumberOfExamsToDisplay] = useState(1)

  useEffect(()=>{

  

  const indexOflevelMatch = school &&  school.levels.map((item)=>(item.levelName)).indexOf(studentData.class)

   if(indexOflevelMatch !== -1){

    setNumberOfExamsToDisplay(Number(school.levels[indexOflevelMatch].examsPerTerm)   )
   }
   else{
   console.log("LEVELS MAY NOT EXIST ON THIS SCHOOL, PLS CHECK")
    setNumberOfExamsToDisplay(1)
   }
   
     },[studentData,school])
   
  

  /*OKAY SO THE PREVAILING LOGIC IS THAT 
  
  I WILL CHECK THE STUDENTS LEVEL, CHECK THE NUMBER OF EXAMS FOR THAT LEVEL
  
  AND THEN USE THAT INFO TO DISPLAY THE NUMBER OF COLUMNS IN THE TABLES

  BUT FOR NOW,
   I AM JUST PULLING THE NUMBER OF EXAMS SPECIFIED FROM THE SCHOOL DATABASE

   AND USING THAT TO REGULATE THE TABLE
  
  */

  useEffect(()=>{

 if(!themeColor){
 dispatch(saveThemeColor( school && school.settings &&  school.settings.themeColor))
 dispatch(saveThemeImage(school && school.settings &&  school.settings.themeImage))
 }


  },[])



  const calculateFinalGrade = (totalScore) => {
    for (const range of gradeRanges) {
      if (totalScore >= range.range[0] && totalScore <= range.range[1]) {
        return range.grade;
      }
    }
    return '';
  };

  const handleScoreChange = (subject, scoreType, value) => {
    const updatedScores = {
      ...scores,
      [subject]: {
        ...scores[subject],
        [scoreType]: value,
      },
    };
       // Calculate and set the final grade based on entered scores
       if (scoreType === 'ca' || scoreType === 'testScores' || scoreType === 'examScores'|| scoreType === 'exam1'|| scoreType === 'exam2'|| scoreType === 'exam3' ) {
        const ca = parseFloat(updatedScores[subject]?.ca || 0);
        const testScores = parseFloat(updatedScores[subject]?.testScores || 0);
        const examScores = parseFloat(updatedScores[subject]?.examScores || 0);
        const exam1 = parseFloat(updatedScores[subject]?.exam1 || 0);
        const exam2 = parseFloat(updatedScores[subject]?.exam2 || 0);
        const exam3 = parseFloat(updatedScores[subject]?.exam3 || 0);

  
        const totalScore =   
        numberOfExamsToDisplay===  2 ? ca +  exam1 + exam2:
        numberOfExamsToDisplay===  3 ? ca +  exam1 + exam2 + exam3:
                                                                    ca +  exam1                           
          

        const finalGrade = calculateFinalGrade(totalScore);
        updatedScores[subject].finalGrade = finalGrade;
      }
  
      setScores(updatedScores);
    };

    const handleEnterClick = () => {
      // Calculate cumulative and console.log all values
      let totalCumulative = 0;
      for (const subject of subjects) {
        const ca = parseFloat(scores[subject]?.ca || 0);
        const testScores = parseFloat(scores[subject]?.testScores || 0);
        const examScores = parseFloat(scores[subject]?.examScores || 0);
        const exam1 = parseFloat(scores[subject]?.exam1 || 0);
        const exam2 = parseFloat(scores[subject]?.exam2 || 0);
        const exam3 = parseFloat(scores[subject]?.exam3 || 0);
  
        const totalScore =   
        numberOfExamsToDisplay===  2 ? ca +  exam1 + exam2:
        numberOfExamsToDisplay===  3 ? ca +  exam1 + exam2 + exam3:
                                                                    ca +  exam1  

        const finalGrade = calculateFinalGrade(totalScore);
        scores[subject].finalGrade = finalGrade;
  
        totalCumulative += totalScore;
      }

      setCumulative(totalCumulative);
      console.log('Scores:', scores);
      console.log('Cumulative:', totalCumulative);

      const studentId = studentData.studentId;
      const teacherId = user.teacherId;
      const finalGrade = 'A';
      const data ={ scores, totalCumulative, finalGrade, studentId, teacherId };

      console.log("data being sent to create a new result is--->" , data)
      dispatch(createStudentResult(data, navigate, setLoading));
    };

  return (
    <>
      <Table style={{background: '#F8F8F8'}}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Sujet</TableCell>
            {/*<TableCell>Continuous Assessment</TableCell>*/}
            <TableCell>Résultats des Examens 1</TableCell>
         {numberOfExamsToDisplay===  2 &&  <TableCell>Résultats des Examens 2</TableCell> }
          {numberOfExamsToDisplay===  3 &&   <TableCell>Résultats des Examens 3</TableCell>  }
            <TableCell>Note Finale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{subject}</TableCell>
             
              {/*
                <TableCell>
                <TextField
                  value={scores[subject]?.ca || ''}
                  onChange={(e) => handleScoreChange(subject, 'ca', e.target.value)}
                  multiline
                  rows={1}
                  style={{ marginLeft: '40px' }}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      height:"1.1rem"
                    }
                  }}
                />
              </TableCell>
              */}
              
              <TableCell>
                <TextField
                  value={scores[subject]?.exam1 || ''}
                  onChange={(e) => handleScoreChange(subject, 'exam1', e.target.value)}
                  multiline
                  rows={1}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      height:"1.1rem"
                    }
                  }}
                />
              </TableCell>

      {numberOfExamsToDisplay===  2 &&
              <TableCell>
                <TextField
                  value={scores[subject]?.exam2 || ''}
                  onChange={(e) => handleScoreChange(subject, 'exam2', e.target.value)}
                  multiline
                  rows={1}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      height:"1.1rem"
                    }
                  }}
                />
              </TableCell>
          }

          {numberOfExamsToDisplay===  3 &&
              <TableCell>
                <TextField
                  value={scores[subject]?.exam3 || ''}
                  onChange={(e) => handleScoreChange(subject, 'exam3', e.target.value)}
                  multiline
                  rows={1}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      height:"1.1rem"
                    }
                  }}
                />
              </TableCell>
               }

              <TableCell>
                <TextField
                  value={scores[subject]?.finalGrade || ''}
                  disabled={true}
                  
                  onChange={(e) => handleScoreChange(subject, 'finalGrade', e.target.value)}
                  multiline
                  rows={1}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      height:"1.1rem"
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <br />
      <Grid container style={{ backgroundColor: '#F9F9F9', padding: '20px', borderRadius: '14px' }}>
      <Grid item xs={6}>
        <Typography variant="body1" align="left" style={{color: themeColor?themeColor:' #D72A34', fontSize: '20px'}}>
        <b><span style={{lineHeight: '3rem'}}>Cumulatif:</span></b>       
          <TextField
          type='number'
                  value={cumulative}
                  onChange={(e) => setCumulative(e.target.value)}
                  multiline
                  rows={1}
                  style={{maxWidth: '12%', height: '50px'}}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
          <TextField
          type='number'
                  value={cumulative}
                  onChange={(e) => setCumulative(e.target.value)}
                  multiline
                  rows={1}
                  style={{maxWidth: '20%', height: '50px'}}
                  className={classes.searchInput}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
        </Typography>
      </Grid>
      <Grid item xs={6}>
          <Typography variant="body1" align="right" style={{ color: '#2AD776', fontSize: '20px' }}>
            <Button
              variant="contained"
              style={{ minHeight: '50px', minWidth: '145px', backgroundColor: themeColor?themeColor:' #D72A34' }}
              onClick={handleEnterClick}
              disabled={loading}
            >
              {loading ? "Loading" : "Entrer"}
            </Button>
          </Typography>
        </Grid>
    </Grid>
    </>
  );
};

export default AssessmentReportForm;
