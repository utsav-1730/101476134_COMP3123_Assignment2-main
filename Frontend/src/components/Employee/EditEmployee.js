import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  // State to manage form data
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  useEffect(() => {
    loadEmployeeData();
  }, []);

  // Fetch employee details from the server
  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8088/api/v1/emp/employees/${id}`);
      const {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      } = response.data;
      setEmployeeData({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining: date_of_joining.split('T')[0], // Format date
        department,
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching employee details');
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit updated data to the server
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8088/api/v1/emp/employees/${id}`, employeeData);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating employee details');
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleFormSubmit} className="edit-employee-form">
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={employeeData.first_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={employeeData.last_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={employeeData.position}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={employeeData.salary}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date of Joining:
          <input
            type="date"
            name="date_of_joining"
            value={employeeData.date_of_joining}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={employeeData.department}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
