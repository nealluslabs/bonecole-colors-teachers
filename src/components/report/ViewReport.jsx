import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: '#', width: 150 },
  { field: '1', headerName: 'Student Absent', width: 200 },
  { field: '2', headerName: 'Gender', width: 200 },
  { field: '3', headerName: 'Class', width: 200 },
  { field: '4', headerName: 'Section', width: 200 },
 
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
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
  { id: 1, 1: 'Jack Dawson', 2: 'Male', 3: 'SS3', 4: 'A' },
]

export default function ViewReport() {
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
