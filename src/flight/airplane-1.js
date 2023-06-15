import { doQuery } from "../shared/mysql.js";
import { createSection } from "./section.js";

async function fetchSeats() {
  const data = await doQuery("select * from seat");
  return data;
}

export async function buildAirplane() {
  const seats = await fetchSeats();
  return {
    firstClassLeft: createSection(["A", "B"], 4, 1, seats),
    firstClassRight: createSection(["F", "G"], 4, 1, seats),
    premiumClassLeft: createSection(["A", "B", "C"], 8, 8, seats),
    premiumClassRight: createSection(["E", "F", "G"], 8, 8, seats),
    economicLeft: createSection(["A", "B", "C"], 16, 19, seats),
    economicRight: createSection(["E", "F", "G"], 16, 19, seats),
  };
}
