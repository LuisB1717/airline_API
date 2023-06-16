import express from "express";
import { airNova } from "./src/flight/airplane.js";
import { doQuery } from "./src/shared/mysql.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.listen(PORT, () => console.log("Server started on port " + PORT));

app.get("/", async (req, res) => {});

function toNumber(letter) {
  switch (letter) {
    case 'A': return 0;
    case 'B': return 1;
    case 'C': return 2;
    case 'D': return 3;
    case 'E': return 4;
    case 'F': return 5;
    case 'G': return 6;
    case 'H': return 7;
    case 'I': return 8;
  }
}

app.get("/flights/:id/passengers", async (req, res) => {
  const flightId = req.params.id
  const flight = await doQuery(`SELECT airplane_id from flight where flight_id = ${flightId}`)
  const airplaneId = flight[0].airplane_id

  const seats = await doQuery(`SELECT * FROM seat where airplane_id = ${airplaneId}`)

  for (const seat of seats) {
    const column = toNumber(seat.seat_column)
    airNova[seat.seat_row - 1][column] = {
      seatId: seat.seat_id,
      seatTypeId: seat.seat_type_id,
    }
  }

  res.send(airNova);
});
