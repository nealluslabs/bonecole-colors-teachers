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



export default function ReportPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchMyGroups(user?.coolers));
    dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])

  useEffect(() => {
    dispatch(fetchUserData(user?.id));
  }, [])


  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('1');

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
              Select Class
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
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
              Select Section
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      &nbsp; &nbsp;

      &nbsp; &nbsp;
      <Box sx={{ }}>
      <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '100px', backgroundColor: '#392751' }}
          >
          Export
        </Button>
            &nbsp; &nbsp;
      <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '100px', backgroundColor: '#D72A8B' }}
        >
          Print
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
              Select Class
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
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
              Select Section
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      &nbsp; &nbsp;
      <Box sx={{ width: '20%', marginTop: '1.2%'}}>
        <CustomSearchBar  title={"Search Student"} />
      </Box>
      <Box sx={{ flexGrow: 1}}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '45px', backgroundColor: '#392751',  marginTop: '3%' }}
        >
          <SearchIcon />
        </Button>
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
              Filter By
            </MenuItem>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>

            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
               <ViewStudents />
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
