import * as React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setLocalStorage } from '../utils/localStorageUtil';

const SignIn = () => {
    const theme = createTheme();
  let navigate = useNavigate();
  
    const handleSubmit = (event) => {
    event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post("http://localhost:8080/log", {
            email: data.get('email'),
            password: data.get('password'),
        })
            .then(res => {
            //console.log(res)
              if (res.status = 200) {
                setLocalStorage('accesss_token', res.data.token);
                    navigate('/dashboard');
                }
            })
            .catch(err => {
                console.log(err);
            })
    
  };
    return (
        <div>
            <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  
        </div>
  );
}  

export default SignIn;