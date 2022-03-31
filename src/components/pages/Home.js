import React, { useState } from 'react';
import {
  Box, Button, Grid, makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import axios from 'axios';
import List from '../students/List';

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

const Home = () => {
  const classes = useStyles();
  const [student, setStudent] = useState({
    stu_name: '',
    email: '',
  });

  const [status, setStatus] = useState();

  const onTextFieldChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    console.log(student);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/students', student);
      setStudent(student.data);
      setStatus(true);
    } catch (erro) {
      console.log('Wrong');
    }
  };
  if (status) {
    return <Home />;
  }
  return (
    <div>
      <Box
        textAlign="center"
        className={classes.headingColor}
        p={2}
        mb={2}
      >
        <Typography variant="h2">React Crud with Api</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stu_name"
                  name="stu_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="stu_name"
                  label="Name"
                  autoFocus
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
          {' '}
          <List />
          {' '}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
