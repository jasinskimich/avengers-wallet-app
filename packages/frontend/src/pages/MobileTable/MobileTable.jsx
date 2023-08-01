import { Box } from "@mui/material";
import Navigation from "../../components/Navigation/Navigation";
import {Currency} from '../../components/Currency/Currency'

function MobileTable() {
	return (
		<Box>
			<Navigation />
			<Currency/>
		</Box>
	);
}

export default MobileTable;
