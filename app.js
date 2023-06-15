import express from "express";
import { buildAirplane } from "./src/flight/airplane-1.js";
import { doQuery } from "./src/shared/mysql.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.listen(PORT, () => console.log("Server started on port " + PORT));

app.get("/", async (req, res) => {
  res.send(await buildAirplane());
});

app.get("/flights/:id/passengers", async (req, res) => {
  const result = await doQuery("SELECT * FROM passenger");
  res.send(result);
});
