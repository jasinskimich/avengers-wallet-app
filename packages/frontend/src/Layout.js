import { Outlet } from "react-router-dom";
import AppBarMain from "./components/AppBarMain/AppBarMain";
import { Suspense } from "react";

function Layout() {
	return (
		<div>
			<AppBarMain />
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
