import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Employee.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('department');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employee data
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8088/api/v1/emp/employees');
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching employees');
    }
  };

  // Delete an employee
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`http://localhost:8088/api/v1/emp/employees/${id}`);
      alert('Employee deleted successfully');
      fetchEmployees(); // Refresh employee list
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting employee');
    }
  };

  // Filter employees based on search criteria
  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase(); // Remove any extra spaces
    setSearchValue(value);
  
    const filtered = employees.filter((emp) => {
      if (searchCriteria === 'id') {
        return emp._id && emp._id.toLowerCase().includes(value);
      } else if (searchCriteria === 'department') {
        return emp.department.toLowerCase().includes(value);
      } else if (searchCriteria === 'position') {
        return emp.position.toLowerCase().includes(value);
      }
      return false;
    });
  
    setFilteredEmployees(filtered);
  };

  return (
    <div className="employee-container">
      <h2>Employee Management</h2>

      {/* Logout Button */}
      <button onClick={() => navigate('/logout')} className="logout-button">
        Log Out
      </button>

      {/* Add New Employee */}
      <button onClick={() => navigate('/employee/add')} className="add-button">
        Add New Employee
      </button>

      {/* Search */}
      <div className="search-container">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="search-select"
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
          <option value="id">ID</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchCriteria}`}
          value={searchValue}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Employee List */}
      <div className="employee-list">
        {filteredEmployees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          filteredEmployees.map((emp) => (
            <div key={emp._id} className="employee-card">
              <h3>
                {emp.first_name} {emp.last_name}
              </h3>
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Position:</strong> {emp.position}</p>
              <p><strong>Department:</strong> {emp.department}</p>

              {/* Action Buttons */}
              <div className="button-group">
                {/* View Employee */}
                <Link to={`/employee/${emp._id}`} className="view-button">
                  View
                </Link>
                {/* Edit Employee */}
                <Link to={`/employee/edit/${emp._id}`} className="edit-button">
                  Edit
                </Link>
                {/* Delete Employee */}
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Employee;
