import { doQuery } from "../shared/mysql";

async function fetchBoardingPass() {
  const data = doQuery("select * from boarding_pass");
  return data;
}
