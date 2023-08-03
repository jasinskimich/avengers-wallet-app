import { Box } from "@mui/material";
import Navigation from "../../components/Navigation/Navigation";
import {Currency} from '../../components/Currency/Currency'
import EuroChart from "../../components/ApiNbp/ApiNbp";

function MobileTable() {
	return (
		<Box>
			<Navigation />
			<Currency/>
			{/* <EuroChart /> */}
		</Box>
	);
}

export default MobileTable;
