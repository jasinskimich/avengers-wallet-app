import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { Box } from "@mui/material/";
import { NavLink, useLocation, useParams } from "react-router-dom";
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
	const { owner } = useParams();

	// style for StyledLink button

	const StyledLink = styled(NavLink)`
		background-color: transparent;
		color: black;
		font-weight: 400;
		font-size: 18px;
		text-decoration: none;
		cursor: pointer;
		border: none;
		display: flex;
		gap: 23px;
		align-items: center;
		&.active {
			font-weight: 500;
			text-shadow: 0px 1px 3px #000000;
		}
	`;

	// set state for active button
	useEffect(() => {
		if (location.pathname === `/home/${owner}`) {
			setHome(true);
			setStatistic(false);
			setMobile(false);
		} else if (location.pathname === `/statistics/${owner}`) {
			setHome(false);
			setStatistic(true);
			setMobile(false);
		} else if (location.pathname === `/mobileTable/${owner}`) {
			setHome(false);
			setStatistic(false);
			setMobile(true);
		}
		// eslint-disable-next-line
	}, [location]);

	return (
		<Box>
			<MediaQuery minWidth={768} maxWidth={2560}>
				<Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", gap: "12px", m: "40px 0px 28px 16px", width: "200px" }}>
					<StyledLink to={`/home/${owner}`}>
						{home ? <HomeActive className={css.svg} /> : <Home className={css.svg} />}
						Home
					</StyledLink>
					<StyledLink to={`/statistics/${owner}`}>
						{statistic ? <StatisticsActive className={css.svg} /> : <Statistics className={css.svg} />}
						Statistics
					</StyledLink>
				</Box>
			</MediaQuery>
			<MediaQuery minWidth={320} maxWidth={767}>
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "36px", paddingTop: "15px" }}>
					<StyledLink to={`/home/${owner}`}>{home ? <HomeActive className={css.svgMobile} /> : <Home className={css.svgMobile} />}</StyledLink>
					<StyledLink to={`/statistics/${owner}`}>{statistic ? <StatisticsActive className={css.svgMobile} /> : <Statistics className={css.svgMobile} />}</StyledLink>
					<StyledLink to={`/mobileTable/${owner}`}>{mobile ? <MobileTableActive className={css.svgMobile} /> : <MobileTable className={css.svgMobile} />}</StyledLink>
				</Box>
			</MediaQuery>
		</Box>
	);
}

export default Navigation;
