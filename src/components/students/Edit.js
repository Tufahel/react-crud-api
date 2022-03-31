import {
  Typography, Box, makeStyles, Grid, TextField, Button,
} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: 'white',
  },
  addStuColor: {
    backgroundColor: green[400],
    color: 'white',
  },

});

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState({
    stu_name: '',
    email: '',
  });
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
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/students/${id}`, student);
    } catch (erro) {
      console.log('Wrong');
    }
  };
  const onTextFieldChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    console.log(student);
  };
  return (
    <div>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="stu_name" name="stu_name" variant="outlined" required fullWidth id="stu_name" label="Name" value={student.stu_name} onChange={(e) => onTextFieldChange(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} onChange={(e) => onTextFieldChange(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="button" variant="contained" color="primary" fullWidth onClick={(e) => onFormSubmit(e)}> Update </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary"><NavLink to="/" className="link" color="primary" style={{ color: 'white' }}>Back to Home</NavLink></Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Edit;
