import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage/DashboardPage";

function Home() {
  const [balance, setBalance] = useState(null);
  const { owner } = useParams();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let response = await fetch(`http://localhost:5000/api/finances/sum/${owner}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}

				response = await response.json();

				setBalance(response.sum);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBalance();
	}, [owner]);

  const updateBalance = (newBalance) => {
    console.log(newBalance);
    setBalance(newBalance);
  };

  return (
    <Box>
      <Balance balance={balance} />
      <h1>Home</h1>
      <p>Path to register or login "/register" , "/login"</p>
      <DashboardPage />
      <ShowModal updateBalance={updateBalance} />
    </Box>
  );
}

export default Home;
