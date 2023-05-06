const express = require("express");
const app = express();
const mysql = require("./src/shared/mysql");
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => console.log("Server started on port " + PORT));

app.get("/", (req, res) => res.send("hola"));
