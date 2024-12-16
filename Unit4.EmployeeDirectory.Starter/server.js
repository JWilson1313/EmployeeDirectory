// TODO: this file :)
const express = require("express");
const app = express();
const employees = require("./employees");

app.get("/", async (req, res) => {
  res
    .status(200)
    .send("Hello Wage Slaves, have you spoken to your union rep today?");
});

app.get("/employees", async (req, res) => {
  res.status(200).json(employees);
});

app.get("/employees/:userid", async (req, res) => {
  const id = req.params.userid;
  const filteredArray = employees.filter(
    (element) => Number(id) === element.id,
    // This should 404 with a message if there is no employee with that id.
    function isNumberExist(num) {
      return typeof num !== "undefined" && !isNaN(num);
    },

    function validateNumber(num) {
      if (!isNumberExist(num)) {
        throw new Error(
          "404: Employee does not exist, speak to your union rep"
        );
      }
      // proceed with number processing
    }
  );
  res.status(200).json(filteredArray);
});

app.get("/employees/random", async (req, res) => {
  res.status(200).json(random);
  function getRandomEmployee(employees) {
    return employees[Math.floor(Math.random() * employees.length)];
  }
});

init();
