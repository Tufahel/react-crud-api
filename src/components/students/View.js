import React, { useEffect, useState } from 'react';
import {
  makeStyles, Table, TableBody, Paper,
  TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button,
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  stulistColor: {
    backgroundColor: orange[400],
    color: 'white',
  },
  tableHeadCell: {
    color: 'white',
  },
});
const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);
        setStudent(student.data);
      } catch (erro) {
        console.log('Wrong');
      }
    }
    getStudent();
  }, [id]);
  return (
    <div>
      <Box textAlign="center" p={2} className={classes.stulistColor} mb={2}>
        <Typography variant="h4">Student Detail</Typography>
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
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stu_name}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center" m={3}>
        <Button variant="contained" color="primary">
          Back to Home
        </Button>
      </Box>
    </div>
  );
};

export default View;
