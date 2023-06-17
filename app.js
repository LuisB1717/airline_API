import express from "express";
import { airMax, airNova } from "./src/core/airplane.js";
import { getFlightById } from "./src/core/flight.js";
import { getPurchaseByFlight } from "./src/core/purchase.js";
import { getBusySeatsByFlight, getSeatsByAirplane } from "./src/core/seats.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.listen(PORT, () => console.log("Server started on port " + PORT));

app.get("/", (req,res) => res.send("Hola, bienvenido a la API"));

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
try {
  const flightId = req.params.id
  const flight = await getFlightById(flightId)
  if (!flight[0]) {
   return res.status(404).send({code: 404, data: {} });
  }
  const airplaneId = flight[0].airplane_id
  const seats = await getSeatsByAirplane(airplaneId)
  const airplane = airplaneId === 1 ? airNova : airMax
  
  const busySeats = await getBusySeatsByFlight(flightId)
  
  for (const seat of seats) {
    const column = toNumber(seat.seat_column)
    const boardingPass = busySeats.find(element => element.seat_id == seat.seat_id)
    
    airplane[seat.seat_row - 1][column] = parseBoardingPass({}, boardingPass, seat)
  }

  const passes = [];
  const purchases = await getPurchaseByFlight(flightId);

  purchases.forEach(purchase => passes.push(...purchase.items));

  for (let i = airplane.length - 1; i > 0 ; i--) {
    for (let j = airplane[i].length - 1; j > 0; j--) {
      const seat = airplane[i][j]
      if (seat === null || !!seat.boardingPassId) continue;
      const boardingPass = passes.shift() || {};
      airplane[i][j] = parseBoardingPass(seat, boardingPass);
    }
  }

  const passengers = [];
  airplane.forEach(row => passengers.push(...row));

  return res.send({
    code: 200,
    data: {
      flightId: parseInt(flightId),
      takeoffDateTime: flight[0].takeoff_date_time,
      takeoffAirport: flight[0].takeoff_airport,
      landingDateTime: flight[0].landing_date_time,
      landingAirport: flight[0].landing_airport,
      airplaneId: flight[0].airplane_id,
      passengers: passengers.filter(element => element !== null),
    },
  });
} catch (error) {
  return res.status(400).send({code: 400, errors: error.message});
}
});

function parseBoardingPass(initialValue, boardingPass, seat) {
  const data = initialValue

  if (seat) {
    data.seatId = seat.seat_id;
    data.seatTypeId = seat.seat_type_id;
  }

  if (boardingPass) {
    data.passengerId = boardingPass.passenger_id;
    data.dni = boardingPass.dni;
    data.name = boardingPass.name;
    data.age = boardingPass.age;
    data.country = boardingPass.country;
    data.boardingPassId = boardingPass.boarding_pass_id;
    data.purcharseId = boardingPass.purcharse_id;
  }

  return data;
}
