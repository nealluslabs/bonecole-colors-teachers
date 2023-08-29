import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container, Grid, MenuItem, Select, FormControl} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import CustomToggleSwitch from "src/components/buttons/CustomToogleSwitch";
import EditStudentToggleSwitch from "src/components/buttons/EditStudentToggleSwitch";
import EditBasicInfo from "src/components/students/EditBasicInfo";
import EditAdditionalInfo from "src/components/students/EditAdditionalInfo";
import EditDocInfo from "src/components/students/EditDocInfo";
import { updateStudent } from "src/redux/actions/student.action";


export default function EditStudentPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const studentData = location.state?.student;
    const [loading, setLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState('');
    const [activeButton, setActiveButton] = useState('1');

    const handleOne = () => {
      setActiveButton('1');
    };
  
    const handleTwo = () => {
      setActiveButton('2');
    };

    const handleThree = () => {
      setActiveButton('3');
    };
  
    const handleAddStudentsClick = () => {
      setActiveButton('addStudents');
    };

    const [state, setState] = useState({
        studentId: studentData.studentId,
        fname: studentData.fname,
        lname: studentData.lname,
        dob: studentData.dob,
        gender: studentData.gender,
        studentshipType: studentData.studentshipType,
        registrationId: studentData.registrationId,
        class: studentData.class,
        section: studentData.section,
        guardianName: studentData.guardianName,
        bloodGroup: studentData.bloodGroup,
        religion: studentData.religion,
        phoneNumber: studentData.phoneNumber,
        email: studentData.email,
        skinColor: studentData.skinColor,
        eyeColor: studentData.eyeColor,
        height: studentData.height,
        nationality: studentData.nationality,
        admissionDate: studentData.admissionDate,
        admissionTerminated: studentData.admissionTerminated,
        medicalHistory: studentData.medicalHistory,
        specialInstruction: studentData.specialInstruction,
      })

      const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
      }

      const handleUpdate = () => {
        setLoading(true);
        dispatch(updateStudent(state, navigate, setLoading ))
      }
  
    return (
      <>
  
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
       <EditStudentToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleOne={handleOne} handleTwo={handleTwo} handleThree={handleThree} />
       <Grid item sx={{mb: 2}}>
        </Grid>
       <Grid item sx={{mb: 2}}>
        </Grid>
            </Grid>
            <br/>
            
          <Grid container spacing={2}>
              <Grid item xs={8} md={12} lg={12}>
                <div style={{background: '#F8F8F8',  padding: '10px'}}>
                 {activeButton === '1' &&  <EditBasicInfo state={state} handleChange={handleChange} handleUpdate={handleUpdate} loading={loading}/>}  
                 {activeButton === '2' && <EditAdditionalInfo state={state} handleChange={handleChange} handleUpdate={handleUpdate} loading={loading}/>}
                 {activeButton === '3' && <EditDocInfo state={state} handleChange={handleChange} handleUpdate={handleUpdate} loading={loading}/>}  
                  </div>
              </Grid>
              
            </Grid>
        </Container>
      </>
    );
  }
  