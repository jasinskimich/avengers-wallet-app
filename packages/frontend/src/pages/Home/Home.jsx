import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";

function Home() {
  return (
    <Box>
      <h1>Home</h1>
      <p>Path to register or login "/register" , "/login"</p>
      <ShowModal />
    </Box>
  );
}

export default Home;
