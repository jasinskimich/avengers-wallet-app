import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";

function Layout() {
	const [loggedName] = useState("")

	return (
		<div>
			<Header name={loggedName}/>
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
