import { Box } from "@mui/material";
import {Currency} from '../../components/Currency/Currency'
import Navigation from "../../components/Navigation/Navigation";

function MobileTable() {
	return (
		<Box>
			<Navigation />
			<Currency/>
		</Box>
	);
}

export default MobileTable;
