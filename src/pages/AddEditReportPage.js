import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import SearchIcon from '@mui/icons-material/Search';
import CummulativeContainer from 'src/components/global/CummulativeContainer';
import AssessmentReportForm from 'src/components/report/AssessmentReportForm.jsx';



export default function AddEditReportPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const studentData = location.state?.student;

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
        <Box >
        <Typography variant="h4" sx={{color: '#392751', fontSize: '36px' }}>
        <b>{studentData.fname} Result Records</b>


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
              Select Class
            </MenuItem>
        <MenuItem value={'JSS 1'}>JSS 1</MenuItem>
        <MenuItem value={'JSS 2'}>JSS 2</MenuItem>
        <MenuItem value={'JSS 3'}>JSS 3</MenuItem>
        <MenuItem value={'SS 1'}>SS 1</MenuItem>
        <MenuItem value={'SS 2'}>SS 2</MenuItem>
        <MenuItem value={'SS 3'}>SS 3</MenuItem>
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
      <Box sx={{ width: '20%',}}>
        <CustomSearchBar  title={"Search Student"} />
      </Box>
      <Box sx={{ flexGrow: 1}}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '45px', backgroundColor: '#392751', }}
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
          </Grid>
          <br/>
          
        <Grid container spacing={2} sx={{ padding: '10px'}}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{ padding: '10px'}}>
               <AssessmentReportForm studentData={studentData}/>
                </div>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}
