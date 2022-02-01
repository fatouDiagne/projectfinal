import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { padding } from '@mui/system';

const SideBar = () => {
    
    
    return (
        <>
        <AppBar position="static"> 
            <Nav>
            <Nav.Item>
              <NavLink to="/addEtudiant" style={{color:"white", marginRight: "15px"}}>Ajout</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/dashboard" style={{color:"white"}}>Dashboard</NavLink>
            </Nav.Item>
          </Nav>
          </AppBar>
        </>
    );
};

export default SideBar;