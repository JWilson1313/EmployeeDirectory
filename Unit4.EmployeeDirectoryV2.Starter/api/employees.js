const express = require("express");
const router = express.Router();
let employees = require("../data/employees");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.status(200).send(employees);
});

router.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = employees.find((element) => element.id === Number(id));
  if (employee) {
    res.status(200).send(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

router.use((req, res, next) => {
  const token = req.header("authorization");
  if (token) {
    next();
  } else {
    res.status(403).send("Please log in");
  }
});

router.post("/employee", (req, res, next) => {
  const { name, species } = req.body;
  employees.push({ id: uuidv4(), name, species });
  res.send(employees);
});

router.delete("/employees/:id", (req, res, next) => {
  const id = req.params.id;
  employees = employees.filter((element) => element.id !== Number(id));
  res.status(200).json(employees);
});

router.put("/employees/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, species } = req.body;
  employees.forEach((element) => {
    if (element.id === Number(id)) {
      element.name = name;
      element.species = species;
    }
  });
  res.status(200).json(employees);
});

module.exports = router;