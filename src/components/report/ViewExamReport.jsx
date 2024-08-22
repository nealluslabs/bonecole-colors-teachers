import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';



export default function ViewExamReport({ result }) {
  const navigate = useNavigate();


  const columns = 
  //checking if there is entry for a third exam, meaning we must show 3 tables
  Object.entries(result.subjects)[0][1].exam3 ?
  
  [
    /*{ field: 'id', headerName: '#', width: 150 },*/
    { field: 'subject', headerName: 'Subject', width: 200 },
    /*{ field: 'ca', headerName: 'Continuous Assessment', width: 200 },*/
    { field: 'exam1', headerName: 'Exam 1', width: 200 },
    { field: 'exam2', headerName: 'Exam 2', width: 200 },
    { field: 'exam3', headerName: 'Exam 3', width: 200 },
    { field: 'finalGrade', headerName: 'Final Grade', width: 200 },
  ] :
  
   //checking if there is entry for a 2nd exam, meaning we must show 2 tables
  Object.entries(result.subjects)[0][1].exam2 ?
  [
    /*{ field: 'id', headerName: '#', width: 150 },*/
    { field: 'subject', headerName: 'Subject', width: 200 },
    /*{ field: 'ca', headerName: 'Continuous Assessment', width: 200 },*/
    { field: 'exam1', headerName: 'Exam 1', width: 200 },
    { field: 'exam2', headerName: 'Exam 2', width: 200 },
    { field: 'finalGrade', headerName: 'Final Grade', width: 200 },
  ]

   :

   //no third exam,no 2nd exam,meaning default of 1 exam--> show 1 table
   [
    /*{ field: 'id', headerName: '#', width: 150 },*/
    { field: 'subject', headerName: 'Subject', width: 200 },
    /*{ field: 'ca', headerName: 'Continuous Assessment', width: 200 },*/
    { field: 'exam1', headerName: 'Exam 1', width: 200 },
   
    { field: 'finalGrade', headerName: 'Final Grade', width: 200 },
  ]

 console.log("RESULTS.SUBJECTS-->",result.subjects)

 console.log("RESULTS.SUBJECTS IN AN ARRAY FORM-->",Object.entries(result.subjects))


  // Transform subject data into rows for DataGrid
  const rows =
  
  Object.entries(result.subjects)[0][1].exam3 ?

    Object.entries(result.subjects).map(([subject, data], index) => ({
    id: index + 1,
    subject: subject,
    /*ca: data.ca || '',*/
    exam1: data.exam1 || '',
     exam2: data.exam2 || '',
      exam3: data.exam3 || '',
    finalGrade: data.finalGrade || '',
  }))
  
  :
  
  Object.entries(result.subjects)[0][1].exam2 ?


  Object.entries(result.subjects).map(([subject, data], index) => ({
    id: index + 1,
    subject: subject,
    /*ca: data.ca || '',*/
    exam1: data.exam1 || '',
     exam2: data.exam2 || '',
    finalGrade: data.finalGrade || '',
  }))
  

  :



  Object.entries(result.subjects).map(([subject, data], index) => ({
    id: index + 1,
    subject: subject,
    /*ca: data.ca || '',*/
    exam1: data.exam1 || '',
    finalGrade: data.finalGrade || '',
  }))


  
  

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
