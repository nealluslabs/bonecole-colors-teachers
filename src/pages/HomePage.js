import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton, Box } from '@mui/material';
import { useEffect } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchGroups, fetchMyGroups } from 'src/redux/actions/group.action';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletBox from 'src/components/home/wallet-box';
import { isItLoading } from 'src/redux/reducers/group.slice';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { BaseOptionChart } from 'src/components/chart2';
import RecentTransaction from 'src/components/home/recent-transaction';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import HomeCoolersCard from 'src/components/home/home-coolers-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import DashboardCard from 'src/components/home/dashboard-card';

import TeacherImg from '../assets/images/dashboard/teacher.png';
import StudentImg from '../assets/images/dashboard/student.png';
import AgentImg from '../assets/images/dashboard/agent.png';
import PieChart from 'src/components/home/pie-chart-one';
import PieChartCard from 'src/components/home/pie-chart-card';
import CustomChart from 'src/components/home/custom-chart';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;



const CHART_DATA = [50, 50];

export default function HomePage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { transactions } = useSelector((state) => state.transaction);


  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.lighter,
      theme.palette.primary.light,
      theme.palette.primary.main,
      theme.palette.primary.dark,
    ],
    labels: [],
    interactions: [],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center', show:false },
    tooltip: {
      enabled: false
  },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            value: {
              formatter: (val) => fNumber(0),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                console.log("user?.accruedBalance: ", user?.accruedBalance);
                return user?.accruedBalance === 0 ? "$0" : fCurrency(user?.accruedBalance);
                // return fNumber(0);
              },
            },
            hover: {
              enabled: false
          },
          },
        },
      },
    },
  });



  // useEffect(() => {
  //   if(user?.id == undefined){
  //    return navigate("/login");
  //   }
  //  }, [])

  useEffect(() => {
   // dispatch(fetchMyGroups(user?.coolers));
   // dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])

  useEffect(() => {
    dispatch(fetchUserData(user?.id));
  }, [])



const myCoolerGroups = myGroups?.length ? (
  myGroups
  .slice(0, 3)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map(group => {
    return (
        <HomeCoolersCard 
      groupId={group.groupId}
      name={group.groupName} 
      fee={fCurrency(group.amount)}
      count={`${group.members && group.members.length} OF ${group.noOfSavers && group.noOfSavers} SAVERS`}
      img={group.imageUrl}
      members={group.members}
      isMember={group.members.includes(user?.id)}
      startDate={group.startDate}
      />
    )
  })
) : 
<>
<EmptyRowCard msg={"Coolers you have joined will appear here."}/>
</>


  return (
    <>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
     {/* First Grid Item */}
     <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Total Number of Teachers'} value={"20"} img={TeacherImg} />
          </Paper>
        </Grid>

        {/* Second Grid Item */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Total Number of Students'} value={"1,220"} img={StudentImg} />
          </Paper>
        </Grid>

        {/* Third Grid Item */}
        {/* <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Total Number of Administrators'} value={"2"} img={AgentImg} />
          </Paper>
        </Grid> */}

        {/* Fourth Grid Item */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Total Expense'} value={"$20,000"} img={TeacherImg} type="last"/>
          </Paper>
          </Grid>
            
          </Grid>
          <br/>
          {/* <SearchBox style={{ width: '100%' }} /> */}
          
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
                <PieChartCard headerOne={"Statistics"} headerTwo={'Ratio (Students)'}  value={"1200"} type={"one"}/>
                </div>
            </Grid>

             <Grid item xs={8} md={12} lg={6}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
                <PieChartCard headerOne={"Statistics"} headerTwo={'Ratio (Teachers)'}  value={"200"} type={"two"}/>
                </div>
            </Grid>

            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
                <CustomChart headerOne={"Statistics"} headerTwo={'Earnings & Expense'}  value={"200"} type={"two"}/>
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
