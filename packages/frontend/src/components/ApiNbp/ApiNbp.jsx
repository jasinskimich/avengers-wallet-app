import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import styles from "./ApiNbp.module.css";

const EuroChart = () => {
  const [euroChartData, setEuroChartData] = useState([]);
  const [usdChartData, setUsdChartData] = useState([]);

  useEffect(() => {
    const fetchEuroData = async () => {
      try {
        const response = await fetch(
          "https://api.nbp.pl/api/exchangerates/rates/a/eur/last/5/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEuroChartData(data.rates);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    const fetchUsdData = async () => {
      try {
        const response = await fetch(
          "https://api.nbp.pl/api/exchangerates/rates/a/usd/last/5/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsdChartData(data.rates);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchEuroData();
    fetchUsdData();
  }, []);

  const customTickFormatter = (tick) => {
    return format(new Date(tick), "dd");
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            data={euroChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="effectiveDate"
              tickFormatter={customTickFormatter}
            />
            <YAxis domain={[4, 5]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mid"
              name="EUR/PLN"
              stroke="#8884d8"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            data={usdChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="effectiveDate"
              tickFormatter={customTickFormatter}
            />
            <YAxis domain={[3.5, 4.5]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mid"
              name="USD/PLN"
              stroke="#82ca9d"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EuroChart;