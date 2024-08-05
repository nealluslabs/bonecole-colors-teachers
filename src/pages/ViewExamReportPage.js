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


export default function ViewExamReportPage() {
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
       <b>{studentData.fname} Result Records</b>

        </Typography>
      </Box>
        <Grid item sx={{mb: 2}}>
     {/*<FormControl sx={{ minWidth: 140 }}>
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
              Sélectionner Classe
            </MenuItem>
            <MenuItem value={'Level 1'}>Level 1</MenuItem>
        <MenuItem value={'Level 2'}>Level 2</MenuItem>
        <MenuItem value={'Level 3'}>Level 3</MenuItem>
        <MenuItem value={'Level 4'}>Level 4</MenuItem>
        <MenuItem value={'Level 5'}>Level 5</MenuItem>
        <MenuItem value={'Level 7'}>Level 7</MenuItem>
        <MenuItem value={'Level 8'}>Level 8</MenuItem>
        <MenuItem value={'Level 9'}>Level 9</MenuItem>
        <MenuItem value={'Level 10'}>Level 10</MenuItem>
        <MenuItem value={'Level 11'}>Level 11</MenuItem>
        <MenuItem value={'Level 12'}>Level 12</MenuItem>
        <MenuItem value={'Level 13'}>Level 13</MenuItem>
          </Select>
          </FormControl>*/}
      </Grid>
     <Grid item sx={{mb: 2}}>
     {/*<FormControl sx={{ minWidth: 140 }}>
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
              Select Section
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>*/}
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

        <Box sx={{marginLeft:"1rem"}}>
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
      </Box>

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
          
        <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
               <ViewExamReport result={studentData.results[0]} />
                </div>
            </Grid>
          </Grid>
          <br/><br/>
         <CummulativeContainer result={studentData.results[0]}/>
      </Container>
    </>
  );
}
