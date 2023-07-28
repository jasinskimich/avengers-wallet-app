import { Box } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StatsTable from "../../components/StatsTable/StatsTable";
import Navigation from "../../components/Navigation/Navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
  return (
    <Box>
      <Navigation />
      <StatsTable />
      <Chart />
      <h1>staty</h1>
    </Box>
  );
}

export default Statistics;
