import { doQuery } from "../shared/mysql.js";

export async function getPurchaseByFlight(flightId){
    const purchases = []
    const data = await doQuery(`SELECT * from boarding_pass bp inner join
    passenger p on p.passenger_id = bp.passenger_id  where seat_id is null 
    and bp.flight_id= ${flightId} ORDER by bp.purchase_id `)
    
    for (const item of data) {
        const element = purchases.find(e => e.id == item.purchase_id);

        if (element) {
            element.items.push(item);
            element.size++;
        } else {
            purchases.push({
                id: item.purchase_id,
                seat_type_id: item.seat_type_id,
                items: [item],
                size: 1,
            });
        }
    }

    return purchases.sort((a, b) => {

        if (a.seat_type_id > b.seat_type_id ) {
            return -1;
        }

        if (a.seat_type_id < b.seat_type_id ) {
            return 1;
        }

        if (hasMinorPassenger(a) && !hasMinorPassenger(b)) {
            return -1;
        }

        if (!hasMinorPassenger(a) && hasMinorPassenger(b)) {
            return 1;
        }

        if (a.items.length > b.items.length) {
            return -1;
        }

        if (a.items.length < b.items.length) {
            return 1;
        }
        
        return 0
    })

}

async function hasMinorPassenger(purchase) {
    const minorPassenger = purchase.items.find(item => item.age < 18)
    return !!minorPassenger
}


