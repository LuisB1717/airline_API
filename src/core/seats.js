import { doQuery } from "../shared/mysql.js";

export async function getBusySeatsByFlight(flightId) {
    const data = await doQuery(`SELECT * from boarding_pass bp inner join passenger p on p.passenger_id = bp.boarding_pass_id  WHERE  bp.flight_id = ${flightId} and bp.seat_id is not null`);
    return data;
}

export async function getSeatsByAirplane (airplaneId){
    const data = await doQuery(`SELECT * FROM seat where airplane_id = ${airplaneId}`)
    return data
}