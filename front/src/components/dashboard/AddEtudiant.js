import { Box, Button, Container, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import SideBar from '../sideBar/SideBar';
import axios from 'axios';
import { getToken } from '../utils/localStorageUtil';
import { useNavigate } from 'react-router';
import { calculMoyenne } from '../utils/allfunction/Moyenne';

const AddEtudiant = () => {
    let navigate = useNavigate();
    let note1 = 0;
    let note2 = 0; 
    const handleSubmit = async  e => {

        e.preventDefault();
        const data = new FormData(e.currentTarget);
             note1 = data.get('note1');

             note2 = data.get('note2'); 
       await axios.post('http://localhost:8080/etudiant',
        {
            firstName: data.get('firstname'),
            lastName: data.get('lastname'),
            dateNaissance: data.get('dateNaissance'),
            note1: note1,
            note2: note2,
            moyenne: calculMoyenne(note1,note2)
        } ,
        {
            headers: { "accesss_token": `Bearer ${getToken()}` }}
            )
            .then(res => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err)
            })
        
                /*console.log({
                    firstName:data.get('firstname'),
                    lastName:data.get('lastname'),
                    dateNaissance:data.get('dateNaissance'),
                    note1:data.get('note1'),
                    note2:data.get('note2')
                })*/
    }

   
    
    return (
        <div>
            <SideBar/>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            type="text"
                            label="Firstname"
                            name="firstname"
                            autoComplete="firstName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            type="text"
                            label="LastName"
                            name="lastname"
                            autoComplete="lastName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dateNaissance"
                            type="text"
                            label="Date Naissance"
                            name="dateNaissance"
                            autoComplete="Date Naissance"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="note1"
                            type="integer"
                            label="Note 1"
                            name="note1"
                            defaultValue={note1}
                            autoComplete="note2"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="note2"
                            type="integer"
                            label="Note 2"
                            name="note2"
                            defaultValue={note2}
                            autoComplete="Note2"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Valider
                        </Button>

                    </Box>
                </Box>
                    
            </Container>
        </div>
    );
};

export default AddEtudiant;