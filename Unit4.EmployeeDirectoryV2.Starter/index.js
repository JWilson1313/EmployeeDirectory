const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("I am listening on port 3000");
});

app.use("/api", require("./api/employees"));


// app.get("/", (req, res) => {
//   res.status(200).send("this route works");
// });