import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployeeForm = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    salary: '',
    joinDate: '',
    department: '',
  });
  const navigate = useNavigate();

  // Handle input changes and update the state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit the form to the backend
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newEmployeeData = {
      first_name: employee.firstName, // backend expects 'first_name'
      last_name: employee.lastName,  // backend expects 'last_name'
      email: employee.email,
      position: employee.position,
      salary: employee.salary,
      date_of_joining: employee.joinDate, // backend expects 'date_of_joining'
      department: employee.department,
    };

    try {
      const response = await axios.post('http://localhost:8088/api/v1/emp/employees', newEmployeeData);
      if (response.status === 200) {
        alert('Employee added successfully');
        navigate('/employee'); // Redirect to employee listing page
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <div className="add-employee-form">
      <h2>Add New Employee</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            name="position"
            value={employee.position}
            onChange={handleInputChange}
            placeholder="Enter Position"
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            id="salary"
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            placeholder="Enter Salary"
            required
          />
        </div>
        <div>
          <label htmlFor="joinDate">Date of Joining:</label>
          <input
            id="joinDate"
            type="date"
            name="joinDate"
            value={employee.joinDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            id="department"
            type="text"
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            placeholder="Enter Department"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
