import React from 'react';
import { Grid, Typography } from '@mui/material';

const CummulativeContainer = ({result}) => {
    
 
  return (
    <Grid container style={{ backgroundColor: '#F9F9F9', padding: '20px', borderRadius: '14px' }}>
      <Grid item xs={6}>
        { console.log("last 2 digits-->",  Number(result.class.slice(result.class.length-2,result.class.length)))}
        <Typography variant="body1" align="left" style={{color: ' #D72A34', fontSize: '20px'}}>
        <b>Score Cumulé: &nbsp; &nbsp; &nbsp;{/*result?.totalCumulative*/
        `08/${result && result.class &&

         Number(result.class.slice(result.class.length-2,result.class.length)) >= 7 ?
         
         "20":"10"}`}</b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" align="right" style={{color: '#2AD776', fontSize: '20px'}}  >
          <b>Passé</b>
        </Typography>
      </Grid>
    </Grid>


  );
};

export default CummulativeContainer;
