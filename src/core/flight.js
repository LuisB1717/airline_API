import { doQuery } from "../shared/mysql.js"

export async function getFlightById(flightId){
    const data = await doQuery(`SELECT * from flight where flight_id = ${flightId}`)
    return data
}

