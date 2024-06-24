import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  /*{
    field: 'id',
    headerName: '#', // Header name
    width: 100,
    renderCell: (params) => {
    },
  },*/
  /*{ field: 'registrationId', headerName: 'Registration ID', width: 200 },*/
  { field: 'fname', headerName: 'First Name', width: 200 },
  { field: 'lname', headerName: 'Last Name', width: 200 },
  { field: 'gender', headerName: 'Gender', width: 200 },
  { field: 'dob', headerName: 'DOB', width: 200 },
  {
    field: 'actions',
    headerName: '',
    width: 130,
    // renderCell: (params) => (
    //   <Grid container alignItems="center" justifyContent="flex-end">
    //       <Button
    //       onClick={() => {
    //         navigate('/dashboard/edit-student');
    //       }}
    //         variant="contained"
    //         style={{ minWidth: '85px', backgroundColor: " #D72A34" }}
    //       >
    //         Action
    //       </Button>
    //     {/* </Link> */}
    //   </Grid>
    // ),
  },
];

export default function ViewStudents({students}) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const dispatch = useDispatch()

  const { themeColor } = useSelector((state) => state.settings);
  const { user,school } = useSelector((state) => state.auth);


  React.useEffect(()=>{

 if(!themeColor){
 dispatch(saveThemeColor( school && school.settings &&  school.settings.themeColor))
 dispatch(saveThemeImage(school && school.settings &&  school.settings.themeImage))
 }


  },[])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns?.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <Grid container alignItems="center" justifyContent="flex-end">
                  <Button
                    onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor: themeColor?themeColor:" #D72A34" }}
                  >
                    Action
                  </Button>
                </Grid>
              ),
            };
          }
          return col;
        })}
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