import { doQuery } from "../shared/mysql.js"

export async function getPurchaseByFlight(flightId){
    const purchases = {}
    const data = await doQuery(`SELECT * from boarding_pass bp inner join passenger p on p.passenger_id = bp.passenger_id  where seat_id is null and bp.flight_id= ${flightId} ORDER by bp.purchase_id `)
    for (const item of data){
        const position = purchases[item.purchase_id]
        if (!position) purchases[item.purchase_id] = [item]
        else purchases[item.purchase_id].push(item)
    }

    return purchases
}