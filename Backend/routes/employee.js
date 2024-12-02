const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("../models/employee");
const routes = express.Router();

// Get all employees
routes.get("/employees", (req, res) => {
    EmployeeModel.find()
        .then((employees) => {
            res.status(200).send(employees);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Search employees by department or position
routes.get("/employees/search", async (req, res) => {
    const { department, position } = req.query;

    if (!department && !position) {
        return res.status(400).send({ message: "Please provide department or position for search." });
    }

    try {
        const filter = {};
        if (department) filter.department = department;
        if (position) filter.position = position;

        const employees = await EmployeeModel.find(filter);
        if (employees.length === 0) {
            return res.status(404).send({ message: "No employees found matching the criteria." });
        }

        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Create a new employee
routes.post("/employees", (req, res) => {
    const { first_name, last_name, department, position, email, date_of_joining, salary } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !department || !position || !email) {
        return res.status(400).send({ message: "All fields are required!" });
    }

    const newEmployee = new EmployeeModel({
        first_name,
        last_name,
        department,
        position,
        email,
        date_of_joining,
        salary,
    });

    newEmployee
        .save()
        .then((employee) => {
            res.status(201).send(employee);
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).send({ message: "Email already exists!" });
            } else {
                res.status(500).send({ message: err.message });
            }
        });
});

// Update employee by ID
routes.put("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;

    // Validate ObjectID
    if (!mongoose.isValidObjectId(employeeId)) {
        return res.status(400).send({ message: "Invalid Employee ID" });
    }

    EmployeeModel.findByIdAndUpdate(employeeId, req.body, { new: true, runValidators: true })
        .then((updatedEmployee) => {
            if (!updatedEmployee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.status(200).send(updatedEmployee);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Delete employee by ID
routes.delete("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;

    // Validate ObjectID
    if (!mongoose.isValidObjectId(employeeId)) {
        return res.status(400).send({ message: "Invalid Employee ID" });
    }

    EmployeeModel.findByIdAndDelete(employeeId)
        .then((deletedEmployee) => {
            if (!deletedEmployee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.status(200).send({ message: "Employee deleted successfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Get employee by ID
routes.get("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;

    // Validate ObjectID
    if (!mongoose.isValidObjectId(employeeId)) {
        return res.status(400).send({ message: "Invalid Employee ID" });
    }

    EmployeeModel.findById(employeeId)
        .then((employee) => {
            if (!employee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.status(200).send(employee);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

module.exports = routes;
