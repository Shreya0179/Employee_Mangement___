const Employee = require("../models/Employee");

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH (name or department)
exports.searchEmployees = async (req, res) => {
  try {
    const { name, department } = req.query;

    const query = {};

    if (name) {
      query.fullName = { $regex: name, $options: "i" };
    }

    if (department) {
      query.department = department;
    }

    const results = await Employee.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};