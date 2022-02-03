import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utils/localStorageUtil';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import SideBar from '../sideBar/SideBar';
import { calculMoyenne } from '../utils/allfunction/Moyenne';

const EditEtudiant = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    let see = false;
    const { idEtu } = useParams();
    const [listEtudiant, setListEtudiant] = useState(null);
    let note1=0;
    let note2=0;

    const getEtudiant = () => {
        axios.get(`http://localhost:8080/etudiant/${idEtu}`,
           {
               headers: { "accesss_token": `Bearer ${getToken()}` }
           })
           .then( async (res) => {
                await setListEtudiant(res.data)
               //console.log(res.data)
           })
           .catch(err => {
               console.log(err);
           })
    }
    
    useEffect( () =>
    
        getEtudiant(),
        []
    )
    const handleSubmit =  async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        note1 = data.get('note1');
        note2 = data.get('note2');
       await axios.put (`http://localhost:8080/etudiant/${idEtu}`,{
            firstName: data.get('firstname'),
            lastName: data.get('lastname'),
            dateNaissance: data.get('dateNaissance'),
            note1: note1,
            note2: note2,
            moyenne: calculMoyenne(note1,note2)
        },
               {headers: { "accesss_token": `Bearer ${getToken()}` }
           }
        )
        .then (res => {
            console.log(res)
            navigate("/dashboard")
        })
        .catch(err =>{
            console.log(err)
        }
           
        )
    }
    
    return (
        <>
        <SideBar/>
        <div>
                    {
                        listEtudiant===null ? 
                        <div> No data </div> : 
                        <div> 
                                        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Modifier
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="FirstName"
              defaultValue={listEtudiant.firstName}
              name="firstname"
              autoComplete="FirstName"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="LastName"
              defaultValue={listEtudiant.lastName}
              type="lastName"
              id="lastname"
              autoComplete="LastName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dateNaissance"
              label="Date de Naissance "
              defaultValue={listEtudiant.dateNaissance}
              name="dateNaissance"
              autoComplete="Date de Naissance"
              autoFocus
            />
            
            <TextField
              margin="normal"
              
              fullWidth
              id="note1"
              label="note 1"
              defaultValue={listEtudiant.note1}
              name="note1"
              autoComplete="note1"
              autoFocus
            />
            <TextField
              margin="normal"
              
              fullWidth
              id="note2"
              label="note 2"
              defaultValue={listEtudiant.note2}
              name="note2"
              autoComplete="note2"
              autoFocus
            />
            {/*<TextField
              margin="normal"
              required
              fullWidth
              id="moyenne"
              label="Moyenne "
              defaultValue={listEtudiant.moyenne}
              name="moyenne"
              autoComplete="moyenne"
              autoFocus
              disabled="{see}"
            />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifier
            </Button>
            
            
          </Box>
        </Box>
        
      </Container>
    
                        </div>
                    }
                         
               
            </div>
        </>
    );
};

export default EditEtudiant;