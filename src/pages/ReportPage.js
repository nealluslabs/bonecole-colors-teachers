import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import HomeCoolersCard from 'src/components/home/home-coolers-card';
import CustomChart from 'src/components/home/custom-chart';
import CustomToggleSwitch from 'src/components/buttons/CustomToogleSwitch';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ViewStudents from 'src/components/students/ViewStudents';
import AddStudent from 'src/components/students/AddStudent';
import ReportToogleSwitch from 'src/components/buttons/ReportToogleSwitch';
import { getStudents } from 'src/redux/actions/student.action';
import ViewStudentsReport from 'src/components/students/ViewStudentReport';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';
/*import html2pdf from 'html2pdf.js';*/


export default function ReportPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.student);


  useEffect(() => {
    //dispatch(fetchMyGroups(user?.coolers));
    //dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])

  useEffect(() => {
    dispatch(fetchUserData(user?.id));
  }, [])

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, [])

 

  const { themeColor } = useSelector((state) => state.settings);
  const {school } = useSelector((state) => state.auth);


 useEffect(()=>{

 if(!themeColor){
 dispatch(saveThemeColor( school && school.settings &&  school.settings.themeColor))
 dispatch(saveThemeImage(school && school.settings &&  school.settings.themeImage))
 }


  },[])



  const [mainOpenMenu,setMainMenuOpen] = useState(false)
    const [levelFilter,setLevelFilter] = useState(false)
  const [genderFilter,setGenderFilter] = useState(false)
  const [statusFilter,setStatusFilter] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [activeButton, setActiveButton] = useState('1');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedValue(event.target.value);
  };

  const handleSelectChange1 = (event) => {
  
    setSelectedValue(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
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
 // html2pdf().from(content).set(options).save();
};



  return (
    <>

      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
     <ReportToogleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleOne={handleOne} handleTwo={handleTwo} handleThree={handleThree} />
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
        </FormControl>
      </Grid>
     <Grid item sx={{mb: 2}}>
    {/* <FormControl sx={{ minWidth: 140 }}>
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

      &nbsp; &nbsp;
      <Box sx={{ }}>
          <Button
              onClick={()=>{/*downloadPageContent("printableArea")*/}}
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
          </Grid>
          <br/>
          
        <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
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
              Sélectionner Classe
            </MenuItem>
        <MenuItem value={'Level 1'}>Niveau 1</MenuItem>
        <MenuItem value={'Level 2'}>Niveau 2</MenuItem>
        <MenuItem value={'Level 3'}>Niveau 3</MenuItem>
        <MenuItem value={'Level 4'}>Niveau 4</MenuItem>
        <MenuItem value={'Level 5'}>Niveau 5</MenuItem>
        <MenuItem value={'Level 7'}>Niveau 7</MenuItem>
        <MenuItem value={'Level 8'}>Niveau 8</MenuItem>
        <MenuItem value={'Level 9'}>Niveau 9</MenuItem>
       <MenuItem value={'Level 10'}>Niveau 10</MenuItem>
       <MenuItem value={'Level 11'}>Niveau 11</MenuItem>
       <MenuItem value={'Level 12'}>Niveau 12</MenuItem>
       <MenuItem value={'Level 13'}>Niveau 13</MenuItem>
          </Select>
        </FormControl>
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
      <Box sx={{ width: '20%', marginTop: '1.2%'}}>
        <CustomSearchBar  title={"Rechercher étudiant"} />
      </Box>
      <Box sx={{ flexGrow: 1}}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '45px', backgroundColor: ' #000000',  marginTop: '3%' }}
        >
          <SearchIcon />
        </Button>
      </Box>

      <Grid item sx={{mb: 2,position:"relative",width:"9rem"}}>
     <FormControl sx={{ minWidth: 140, position:"absolute",left:"0rem",top:"0rem" }}>
          <Select
            value={selectedValue}
            onChange={handleSelectChange}
            displayEmpty
            label=""
            sx={{
            //   minHeight: 30,
              minWidth: 120,
              p: 1,
            }}
          >
          
          
           {/* <p  onMouseLeave={()=>{setMainMenuOpen(false)}}>  */}
            <MenuItem value="">
              Filtrer Par
            </MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(true);setGenderFilter(false); setStatusFilter(false);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Niveau"}>Niveau</MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(false);setGenderFilter(true); setStatusFilter(false);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Genre"}>Genre</MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(false);setGenderFilter(false); setStatusFilter(true);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Statut"}>Statut</MenuItem>

        <MenuItem style={{display:"none"}} value={'Niveau 1'}>Niveau 1</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 2'}>Niveau 2</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 3'}>Niveau 3</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 4'}>Niveau 4</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 5'}>Niveau 5</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 7'}>Niveau 7</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 8'}>Niveau 8</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 9'}>Niveau 9</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 10'}>Niveau 10</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 11'}>Niveau 11</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 12'}>Niveau 12</MenuItem>
        <MenuItem style={{display:"none"}} value={'Niveau 13'}>Niveau 13</MenuItem>

        <MenuItem style={{display:"none"}}   value={"Mâle"}>Mâle</MenuItem>
        <MenuItem style={{display:"none"}}   value={"Femelle"}>Femelle</MenuItem>


        <MenuItem style={{display:"none"}}  value={"payé"}>payé</MenuItem>
        <MenuItem style={{display:"none"}}  value={"non payé"}>non payé</MenuItem>

           {/*</p>*/}

          </Select>
        </FormControl>


         {/*1 LEVEL FILTER DROPDOWN */}
        { levelFilter &&
        <div style={{  position:"absolute",left:"1rem",top:"4rem",backgroundColor:"white"}}>
        <FormControl style={{ width: 120}}>
          <Select onMouseLeave={()=>{setLevelFilter(false)}}
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
           
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 1"}>Niveau 1</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 2"}>Niveau 2</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 3"}>Niveau 3</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 4"}>Niveau 4</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 5"}>Niveau 5</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 6"}>Niveau 6</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 7"}>Niveau 7</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 8"}>Niveau 8</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 9"}>Niveau 9</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 10"}>Niveau 10</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 11"}>Niveau 11</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 12"}>Niveau 12</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Niveau 13"}>Niveau 13</MenuItem>

            
           
          </Select>
        </FormControl>
        </div>
         }



                           {/*2 GENDER FILTER DROPDOWN */}
                             { genderFilter &&
                                  <div style={{  position:"absolute",left:"1rem",top:"4rem",backgroundColor:"white"}} >
                                     <FormControl sx={{ width: 120 }}>
                                       <Select  onMouseLeave={()=>{setGenderFilter(false)}}
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
                                        
                                         
                                         <MenuItem  onClick={()=>{setGenderFilter(false);setMainMenuOpen(false)}} value={"Mâle"}>Mâle</MenuItem>
                                         <MenuItem  onClick={()=>{setGenderFilter(false);setMainMenuOpen(false)}} value={"Femelle"}>Femelle</MenuItem>
                                        
                                       </Select>
                                     </FormControl>
                                 </div>
                                      }
                             


                      {/*3 STATUS FILTER DROPDOWN */}
                     { statusFilter &&
                         <div style={{  position:"absolute",left:"1rem",top:"4rem",backgroundColor:"white"}} >
                             <FormControl sx={{ minWidth: 140}}>
                               <Select  onMouseLeave={()=>{setStatusFilter(false)}}
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
                                
                                 
                                 <MenuItem onClick={()=>{setStatusFilter(false);setMainMenuOpen(false)}} value={"Payé"}>Payé</MenuItem>
                                 <MenuItem onClick={()=>{setStatusFilter(false);setMainMenuOpen(false)}} value={"Non Payé"}>Non Payé</MenuItem>
                                
                               </Select>
                             </FormControl>
                          </div>   
                              }



      </Grid>

            <Grid id="printableArea" item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
              {activeButton === '1' &&  <ViewStudentsReport students={students}/>}  
              {activeButton === '2' &&  <ViewStudentsReport students={students}/>}  
              {activeButton === '3' &&  <ViewStudentsReport students={students}/>}  
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
