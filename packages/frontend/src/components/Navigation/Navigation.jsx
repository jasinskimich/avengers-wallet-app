import { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as HomeActive } from "../../images/homeActive.svg";
import { ReactComponent as Statistics } from "../../images/statistics.svg";
import { ReactComponent as StatisticsActive } from "../../images/statisticsActive.svg";
import { ReactComponent as MobileTable } from "../../images/mobileTable.svg";
import { ReactComponent as MobileTableActive } from "../../images/mobileTableActive.svg";
import css from "../Navigation/Navigation.module.css";
import styled from "@emotion/styled";

function Navigation() {
	//hooks
	const [home, setHome] = useState(false);
	const [statistic, setStatistic] = useState(false);
	const [mobile, setMobile] = useState(false);
	const location = useLocation();

	// style for StyledLink button

	const StyledLink = styled(NavLink)`
		background-color: transparent;
		color: black;
		font-weight: 500;
		font-size: 18px;
		text-decoration: none;
		cursor: pointer;
		border: none;
		display: flex;
		gap: 23px;
		align-items: center;
		&.active {
			font-weight: 900;
			text-shadow: 0px 1px 4px #000000;
		}
	`;

	// set state for active button
	useEffect(() => {
		if (location.pathname === "/") {
			setHome(true);
			setStatistic(false);
			setMobile(false);
		} else if (location.pathname === "/statistics") {
			setHome(false);
			setStatistic(true);
			setMobile(false);
		} else if (location.pathname === "/mobileTable") {
			setHome(false);
			setStatistic(false);
			setMobile(true);
		}
	}, [location]);

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", gap: "12px", m: "40px 0px 28px 16px" }}>
			<StyledLink to="/">
				{home ? <HomeActive className={css.svg} /> : <Home className={css.svg} />}
				Home
			</StyledLink>
			<StyledLink to="/statistics">
				{statistic ? <StatisticsActive className={css.svg} /> : <Statistics className={css.svg} />}
				Statistics
			</StyledLink>
			<StyledLink to="/mobileTable">{mobile ? <MobileTableActive className={css.svg} /> : <MobileTable className={css.svg} />}</StyledLink>
		</Box>
	);
}

export default Navigation;
