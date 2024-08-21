import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ViewReport from 'src/components/report/ViewExamReport';
import ViewExamReport from 'src/components/report/ViewExamReport';
import CummulativeContainer from 'src/components/global/CummulativeContainer';
import html2pdf from 'html2pdf.js';
import AttendanceReportForm from 'src/components/report/AttendanceReportForm';


export default function ViewAttendanceReportPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { themeColor } = useSelector((state) => state.settings);
  const studentData = location.state?.student;

  useEffect(() => {
   // dispatch(fetchMyGroups(user?.coolers));
   // dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])

  useEffect(() => {
    dispatch(fetchUserData(user?.id));
  }, [])

  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('3');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOne = () => {
    setActiveButton('1');
 
  };

  const handleTwo = () => {
    setActiveButton('2');
  };

  const handleThree = () => {
    setActiveButton('3');
  };


  function printPageArea(areaID){
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    setTimeout(window.location.reload(), 0);
}


const downloadPageContent = (areaID) => {
  // Get the HTML content of the current page
  const content = document.getElementById(areaID).outerHTML;

  const options = {
    margin: 0.5,
    filename: 'page.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: window.devicePixelRatio },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  // Convert the HTML content to PDF
  html2pdf().from(content).set(options).save();
};


  console.log("DATAA:::::::", studentData);

  return (
    <>

      <Container id="printableArea" maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
        <Box >
        <Typography variant="h4" sx={{color: ' #000000', fontSize: '36px' }}>
       <b>{studentData.fname} Attendance Records</b>

        </Typography>
      </Box>
      
        <Grid item sx={{mb: 2}}>
     <FormControl sx={{ minWidth: 140 }}>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            displayEmpty
            label=""
            sx={{
            //   minHeight: 30,
              minWidth: 140,
              p: 1,
            }}
          >
            <MenuItem value="">
            Sélectionner l'année
            </MenuItem>
            <MenuItem value={'Année 1'}>Année 1</MenuItem>
        <MenuItem value={'Année 2'}>Année 2</MenuItem>
        <MenuItem value={'Année 3'}>Année 3</MenuItem>
        <MenuItem value={'Année 4'}>Année 4</MenuItem>
        <MenuItem value={'Année 5'}>Année 5</MenuItem>
        <MenuItem value={'Année 7'}>Année 7</MenuItem>
        <MenuItem value={'Année 8'}>Année 8</MenuItem>
        <MenuItem value={'Année 9'}>Année 9</MenuItem>
        <MenuItem value={'Année 10'}>Année 10</MenuItem>
        <MenuItem value={'Année 11'}>Année 11</MenuItem>
        <MenuItem value={'Année 12'}>Année 12</MenuItem>
        <MenuItem value={'Année 13'}>Année 13</MenuItem>
          </Select>
          </FormControl>
      </Grid>
     


     <Grid item sx={{mb: 2}}>
     <FormControl sx={{ minWidth: 140 }}>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            displayEmpty
            label=""
            sx={{
            //   minHeight: 30,
              minWidth: 140,
              p: 1,
            }}
          >
            <MenuItem value="">
             sélectionner  Terme
            </MenuItem>
            <MenuItem value={1}>Terme 1</MenuItem>
            <MenuItem value={2}>Terme 2</MenuItem>
            <MenuItem value={3}>Terme 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      &nbsp; &nbsp;
      <Box sx={{ width: '20%',}}>
        <CustomSearchBar  title={"Rechercher étudiant"} />
      </Box>
      <Box sx={{ flexGrow: 1,display:"flex"}}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '45px', backgroundColor: ' #000000', }}
        >
          <SearchIcon />
        </Button>

        {/*<Box sx={{marginLeft:"1rem"}}>
        <Button
              onClick={()=>{downloadPageContent("printableArea")}}
               variant="contained" style={{ minHeight: '50px', minWidth: '100px', backgroundColor: '#000000' }}>
                Exporter
              </Button>
              &nbsp; &nbsp;
              <Button
               onClick={()=>{printPageArea("printableArea");} }
              variant="contained" style={{ minHeight: '50px', minWidth: '100px', backgroundColor: themeColor?themeColor:"#D72A34" }}>
                Imprimer
              </Button>
      </Box>*/}

      </Box>

      <Grid item sx={{mb: 2}}>
     <FormControl sx={{ minWidth: 140 }}>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            displayEmpty
            label=""
            sx={{
            //   minHeight: 30,
              minWidth: 120,
              p: 1,
            }}
          >
            <MenuItem value="">
             Filtrer Par
            </MenuItem>
            <MenuItem value={"Subject"}>Sujet</MenuItem>
            <MenuItem value={"Grade (Descending)"}>Note (décroissante)</MenuItem>
           
          </Select>
        </FormControl>
      </Grid>
          </Grid>
          <br/>
          
       {/* <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
               <ViewExamReport result={studentData.results[0]} />
                </div>
            </Grid>
          </Grid>*/}


          <Grid container spacing={2} sx={{ padding: '10px'}}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{ padding: '10px'}}>
               <AttendanceReportForm studentData={studentData}/>
                </div>
            </Grid>
          </Grid>



         {/* <br/><br/>
         <CummulativeContainer result={studentData.results[0]}/>
        */}
      </Container>
    </>
  );
}
