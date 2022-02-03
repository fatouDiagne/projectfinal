import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { getToken } from '../utils/localStorageUtil';
import SideBar from '../sideBar/SideBar';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


const Dashboard = () => {
    
    
    const [listEtudiant, setListEtudiant] = React.useState ([]);
    const [searchKey, setSearchKey] = React.useState("");
    const searchChange = (e) => {
      setSearchKey(e.target.value)
    }

    const filteredList = () => {
      return listEtudiant.filter((etudiant)=> {
        if(searchKey == "") {
          return etudiant;
        }
        else if( (etudiant.firstName.toLowerCase().includes(searchKey.toLowerCase())) || (etudiant.lastName.toLowerCase().includes(searchKey.toLowerCase())) ) {
          return etudiant;
        }
      })
    }
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginTop: theme.spacing(10),
      marginRight: theme.spacing(70),
      marginLeft: 0,
      width: '50%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(50),
        width: '50%',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      color:'blue',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
  
    const  getEtudiant = () => {
       axios.get("http://localhost:8080/etudiant",
           {
           headers:{"accesss_token":`Bearer ${getToken ()}` }
       })
            .then(res => {
                setListEtudiant(res.data)
                //console.log(listEtudiant)
            })
            .catch(err => {
                console.log(err);
            })
    }
    React.useEffect (() =>
        getEtudiant(),
        []
    )
    //console.log(props);
    return (
        <>
            <SideBar/>

            
            <div style={{marginBottom:"1px"}}>
                <input type="search" placeholder="Search..." name={searchKey} onChange={searchChange} style={{marginTop:"40px"}} />
            </div>
          
      <div className="tablestyle">
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
                <TableCell>
                    Firstname
                </TableCell>
                <TableCell>
                    Lastname
                </TableCell>
                <TableCell>
                    Date Naissance
                </TableCell>
                <TableCell>
                     note1
                </TableCell>
                <TableCell>
                     note2
                </TableCell>
                <TableCell>
                     moyenne
                </TableCell>
                <TableCell>
                    Détail
                </TableCell>                     
            </TableRow>
          </TableHead>
          
            {filteredList()
              .map(index => (
                  <TableBody>
                
                  <TableRow>
                      
                        <TableCell>
                          {index.firstName}
                          </TableCell>
                          <TableCell>
                          {index.lastName}
                          </TableCell>
                          <TableCell>
                          {index.dateNaissance}
                          </TableCell>
                          <TableCell>
                          {index.note1}
                          </TableCell>
                          <TableCell>
                          {index.note2}
                          </TableCell>
                          <TableCell>
                          {index.moyenne}
                          </TableCell>
                         <TableCell>
                            {/*pathname: `/edit/${index.id}`,*/}
                                    <Link
                                        to={{
                                            
                                            pathname: `/edit/${index.idEtu}`,
                                            state: { index }
                                        }}
                                    >
                                      <Fab color="secondary" aria-label="edit">
                                        <EditIcon />
                                      </Fab>
                                    </Link>
                              
                                    <Link
                                        to={{
                                            pathname: "/delete",
                                            state: { index }
                                        }}
                                    >
                                    <i
											className="icofont-ui-delete"
											style={{ color: "red", fontSize: 20 }}
									    />
                                    </Link>
                              
                        </TableCell>  
                      </TableRow>
                       
                  </TableBody>
                 
                  ))}
        </Table>
      </TableContainer>
                </Paper>
                <div>
                    {/*console.log(listEtudiant[0])*/}
                </div>
            </div>
            </>
  );
}
export default Dashboard;
