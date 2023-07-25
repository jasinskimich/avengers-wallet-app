import { Outlet } from "react-router-dom";
import AppBarMain from "./components/AppBarMain/AppBarMain";
import { Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";

function Layout() {
	return (
		<div>
			<AppBarMain />
			<Navigation />
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
