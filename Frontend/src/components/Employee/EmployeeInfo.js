import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Alert,
} from '@mui/material';

const EmployeeInfo = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch employee details on component mount or when ID changes
  useEffect(() => {
    fetchEmployee();
  }, [id]);  // Adding id dependency so it updates when ID changes

  const fetchEmployee = async () => {
    console.log('Fetching employee with ID:', id);  // Log the ID to verify
    try {
      const res = await axios.get(`http://localhost:8088/api/v1/emp/employees/${id}`);
      setEmployee(res.data);  // Make sure the structure of response is as expected
    } catch (err) {
      console.error('Error fetching employee:', err); // Log the error for debugging
      setError(err.response?.data?.message || 'Error fetching employee details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '50px auto', padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Information
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  First Name:
                </Typography>
                <Typography>{employee.first_name}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Last Name:
                </Typography>
                <Typography>{employee.last_name}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email:
                </Typography>
                <Typography>{employee.email}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Position:
                </Typography>
                <Typography>{employee.position}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Salary:
                </Typography>
                <Typography>${employee.salary}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Date of Joining:
                </Typography>
                <Typography>{new Date(employee.date_of_joining).toLocaleDateString()}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Department:
                </Typography>
                <Typography>{employee.department}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default EmployeeInfo;
