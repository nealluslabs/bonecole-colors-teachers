import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';

const columns = [
 /* {
    field: 'id',
    headerName: '#', 
    width: 100,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'studentName', 
    headerName: 'Étudiant',
    width: 200,
    renderCell: (params) => {
      const fullName = `${params.row.fname} ${params.row.lname}`;
      return <div>{fullName}</div>;
    },
  },
  { field: 'gender', headerName: 'Genre', width: 200 },
  { field: 'class', headerName: 'Classe', width: 200 },
  { field: 'section', headerName: 'Section', width: 200 },
  {
    field: 'actions',
    headerName: '',
    width: 300,
  },
];

export default function ViewStudentsReport({ students }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/view-exam-report', { state: { student } });
  };

  const handleAddResult = (student) => {
    navigate('/dashboard/action-reports', { state: { student } });
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
        columns={columns.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor:themeColor?themeColor: "#D72A34", marginRight: '20px' }}
                  >
                    Voir Résultat
                  </Button>
                  <Button
                    onClick={() => handleAddResult(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor:themeColor?themeColor: "#D72A34" }}
                  >
                    Ajouter Résultat
                  </Button>
                </div>
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