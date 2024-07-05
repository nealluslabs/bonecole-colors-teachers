import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import CustomToggleSwitch from 'src/components/buttons/CustomToogleSwitch';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ViewStudents from 'src/components/students/ViewStudents';
import AddStudent from 'src/components/students/AddStudent';
import { getStudents } from 'src/redux/actions/student.action';



export default function StudentPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { students } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchMyGroups(user?.coolers));
    dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])
  console.log("STUDENTS:::::", students);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, [])



  const [mainOpenMenu,setMainMenuOpen] = useState(false)
    const [levelFilter,setLevelFilter] = useState(false)
  const [genderFilter,setGenderFilter] = useState(false)
  const [statusFilter,setStatusFilter] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [activeButton, setActiveButton] = useState('viewStudents');

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

  return (
    <>

      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
     <CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>
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
              Select Class
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
          </FormControl> */}
      </Grid>
      &nbsp; &nbsp;
      <Box sx={{ width: '20%' }}>
        <CustomSearchBar  title={"Search Student"} />
      </Box>
      <Box sx={{ flexGrow: 1}}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '45px', backgroundColor: ' #000000' }}
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
              Filter By
            </MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(true);setGenderFilter(false); setStatusFilter(false);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Level"}>Level</MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(false);setGenderFilter(true); setStatusFilter(false);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Gender"}>Gender</MenuItem>
            <MenuItem onClick={(e)=>{setLevelFilter(false);setGenderFilter(false); setStatusFilter(true);setMainMenuOpen(true);setSelectedValue(e.target.value)}} value={"Status"}>Status</MenuItem>

            <MenuItem style={{display:"none"}} value={'Level 1'}>Level 1</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 2'}>Level 2</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 3'}>Level 3</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 4'}>Level 4</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 5'}>Level 5</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 7'}>Level 7</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 8'}>Level 8</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 9'}>Level 9</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 10'}>Level 10</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 11'}>Level 11</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 12'}>Level 12</MenuItem>
        <MenuItem style={{display:"none"}} value={'Level 13'}>Level 13</MenuItem>

        <MenuItem style={{display:"none"}}   value={"Male"}>Male</MenuItem>
        <MenuItem style={{display:"none"}}   value={"Female"}>Female</MenuItem>


        <MenuItem style={{display:"none"}}  value={"Paid"}>Paid</MenuItem>
        <MenuItem style={{display:"none"}}  value={"Unpaid"}>Unpaid</MenuItem>

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
           
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 1"}>Level 1</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 2"}>Level 2</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 3"}>Level 3</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 4"}>Level 4</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 5"}>Level 5</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 6"}>Level 6</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 7"}>Level 7</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 8"}>Level 8</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 9"}>Level 9</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 10"}>Level 10</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 11"}>Level 11</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 12"}>Level 12</MenuItem>
            <MenuItem onClick={()=>{setLevelFilter(false);setMainMenuOpen(false)}} value={"Level 13"}>Level 13</MenuItem>

            
           
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
                                        
                                         
                                         <MenuItem  onClick={()=>{setGenderFilter(false);setMainMenuOpen(false)}} value={"Male"}>Male</MenuItem>
                                         <MenuItem  onClick={()=>{setGenderFilter(false);setMainMenuOpen(false)}} value={"Female"}>Female</MenuItem>
                                        
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
                                
                                 
                                 <MenuItem onClick={()=>{setStatusFilter(false);setMainMenuOpen(false)}} value={"Paid"}>Paid</MenuItem>
                                 <MenuItem onClick={()=>{setStatusFilter(false);setMainMenuOpen(false)}} value={"Unpaid"}>Unpaid</MenuItem>
                                
                               </Select>
                             </FormControl>
                          </div>   
                              }



      </Grid>


          </Grid>
          <br/>
          
        <Grid container spacing={2}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
               {activeButton === 'viewStudents' &&  <ViewStudents students={students}/>}  
               {/* <ViewStudents /> */}
               {activeButton === 'addStudents' && <AddStudent />}
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
