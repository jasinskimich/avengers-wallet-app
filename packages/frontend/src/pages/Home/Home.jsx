import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";

function Home() {
  return (
    <Box>
      <Balance/>
      <h1>Home</h1>
      <p>Path to register or login "/register" , "/login"</p>
      <ShowModal />
    </Box>
  );
}

export default Home;
