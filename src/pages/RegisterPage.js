import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components

import IMG from '../assets/images/office.jpeg';
import BONLOGO from '../assets/images/logo.png';
import RegisterForm from 'src/components/register/RegisterForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 980,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${IMG})`,
  backgroundSize: '100% 100%', 
  objectFit: 'cover',
  backgroundPosition: 'center',
}));


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Register | BON Web </title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row' }}>
        {mdUp && (
           <StyledSection style={{ border: '0px solid green', flex: 3 }}>
       </StyledSection>
        )}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>
          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img src={BONLOGO} width="240" height="45" />
          </div>
            <Typography variant="h4" gutterBottom>
            Registration
            </Typography>
            <RegisterForm />
            <Typography variant="body2" sx={{ mt: 2 }}>
             Already have an account? {''}
              <Link href='/login' variant="subtitle2">Login</Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
