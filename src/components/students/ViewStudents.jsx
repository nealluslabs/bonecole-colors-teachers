import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: '#', width: 100 },
  { field: 'regId', headerName: 'Registration ID', width: 200 },
  { field: 'fname', headerName: 'First name', width: 150 },
  { field: 'lname', headerName: 'Last Name', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'dob', headerName: 'DOB', width: 150 },
  { field: 'age', headerName: 'Age', width: 100 },
  {
    field: 'actions',
    headerName: '',
    width: 130,
    renderCell: (params) => (
      <Grid container alignItems="center" justifyContent="flex-end">
        {/* <Link to="dashboard/view-student"> */}
          <Button
          onClick={() => {
            // navigate('/dashboard/view-student');
            window.location.href = '/dashboard/edit-student';
          }}
            variant="contained"
            style={{ minWidth: '85px', backgroundColor: "#392751" }}
          >
            Action
          </Button>
        {/* </Link> */}
      </Grid>
    ),
  },
];

const rows = [
  { id: 1, regId: '11380033', fname: 'Jack', lname: 'Dawson', gender: 'Male', dob: '01-03-2010', age: '46' },
  { id: 1, regId: '13550033', fname: 'Bella', lname: 'Donna', gender: 'Female', dob: '01-03-2010', age: '28' },
  { id: 1, regId: '11380033', fname: 'John', lname: 'Wick', gender: 'Male', dob: '01-03-2010', age: '51' },
  { id: 1, regId: '11380033', fname: 'Arjit', lname: 'Sinngh', gender: 'Male', dob: '01-03-2010', age: '34' },
  { id: 1, regId: '11380033', fname: 'Samu', lname: 'Eracdo', gender: 'Male', dob: '01-03-2010', age: '27' },
  { id: 1, regId: '11380033', fname: 'Carla', lname: 'Esposito', gender: 'Female', dob: '01-03-2010', age: '24' },
  { id: 1, regId: '11380033', fname: 'Eva', lname: 'Johnson', gender: 'Female', dob: '01-03-2010', age: '25' },
  { id: 1, regId: '11380033', fname: 'Monica', lname: 'Lamera', gender: 'Female', dob: '01-03-2010', age: '28' },
  { id: 1, regId: '11380033', fname: 'Santos', lname: 'Uzi', gender: 'Male', dob: '01-03-2010', age: '29' },
  { id: 1, regId: '11380033', fname: 'Lidia', lname: 'James', gender: 'Female', dob: '01-03-2010', age: '32' },
]

export default function ViewStudents() {
  const navigate = useNavigate();

  const handleViewResultClick = (id) => {
   
    navigate('/dashboard/edit-student'); 
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
