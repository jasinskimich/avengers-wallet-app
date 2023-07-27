import { Outlet } from "react-router-dom";
// import AppBarMain from "./components/AppBarMain/AppBarMain";
import { Header } from "./components/Header/Header";
import { Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";

function Layout() {
	return (
		<div>
			<Header/>
			<Navigation />
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
