import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getJobs } from "../redux/actions/job.action";
import {Skeleton, Box} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CJobList from "src/components/job/c-job-list";
import { logout } from "src/redux/actions/auth.action";
import { useNavigate } from "react-router-dom";


export default function LogoutPage() {
    const dispatch = useDispatch();
   const navigate = useNavigate()
  
    useEffect(() => {
   
   
      dispatch(logout(navigate));  
     

    }, [])
  
  

  return (
    <>
      <Helmet>
        <title> Bonecole - Teacher ERP </title>
      </Helmet>

      <Container maxWidth="xl">
        
        </Container>
    </>
  );
}
