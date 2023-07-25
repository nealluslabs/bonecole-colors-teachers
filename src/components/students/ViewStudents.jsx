import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: '#', width: 100 },
  { field: 'name', headerName: 'Student Absent', width: 250 },
  { field: 'gender', headerName: 'Gender', width: 200 },
  { field: 'class', headerName: 'Class', width: 200 },
  { field: 'section', headerName: 'Section', width: 200 },
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
            window.location.href = '/dashboard/view-student';
          }}
            variant="contained"
            style={{ minWidth: '85px', backgroundColor: "#392751" }}
          >
            View Result
          </Button>
        {/* </Link> */}
      </Grid>
    ),
  },
];

const rows = [
  { id: 1, name: 'John Snow', gender: 'Male', class: 'Jss 1', section: 'A' },
  { id: 2, name: 'Central Cee', gender: 'Male', class: 'SS2 1', section: 'B' },
  { id: 3, name: 'Bella Aston', gender: 'Male', class: 'Jss 3', section: 'A' },
  { id: 4, name: 'Carla Esther', gender: 'Female', class: 'SS 3', section: 'B' },
  { id: 5, name: 'Samuel Ricardo', gender: 'Male', class: 'Jss 1', section: 'C' },
  { id: 6, name: 'Bluey Umsy', gender: 'Female', class: 'SS 2', section: 'A' },
];

export default function ViewStudents() {
  const navigate = useNavigate();

  const handleViewResultClick = (id) => {
   
    navigate('/dashboard/view-student'); 
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
