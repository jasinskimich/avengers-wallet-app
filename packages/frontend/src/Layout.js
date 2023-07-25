import { Outlet } from "react-router-dom";
// import AppBarMain from "./components/AppBarMain/AppBarMain";
import { Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import  {Header}  from "./components/Header/Header";

function Layout() {
	return (
		<div>
			<Header />
			<Navigation />
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
