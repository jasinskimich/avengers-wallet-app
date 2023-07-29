import { Box } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StatsTable from "../../components/StatsTable/StatsTable";
import Navigation from "../../components/Navigation/Navigation";
import "./Statistics.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
  return (
    <Box>
      <Navigation />
      <div className="statsPage">
        <Chart />
        <StatsTable />
      </div>
    </Box>
  );
}

export default Statistics;
