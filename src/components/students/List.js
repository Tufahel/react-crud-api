import {
  makeStyles, Table, TableBody, Paper,
  TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, IconButton, Box,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { orange } from '@material-ui/core/colors';
import axios from 'axios';
/* eslint-disable react/no-array-index-key */
const useStyles = makeStyles({
  stulistColor: {
    backgroundColor: orange[400],
    color: 'white',
  },
  tableHeadCell: {
    color: 'white',
  },
});
const List = () => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get('http://localhost:3333/students');
        setStudents(students.data);
      } catch (erro) {
        console.log('Wrong');
      }
    }
    getAllStudent();
  }, []);
  return (
    <div>
      <Box textAlign="center" p={2} className={classes.stulistColor} mb={2}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#616161' }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                  students.map((student, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell align="center">{student.stu_name}</TableCell>
                      <TableCell align="center">{student.email}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View">
                          <IconButton>
                            <Link to={`/view/${student.id}`}>
                              <VisibilityIcon color="primary" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <Link to="/edit/1">
                              <EditIcon color="primary" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
