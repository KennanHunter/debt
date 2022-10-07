import { AppShell, Text } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBar from "./lib/components/scaffold/AppBar";
import Index, { IndexLoader } from "./router/Index";

function App() {
	const router = createBrowserRouter([
		{ path: "/", element: <Index />, loader: IndexLoader },
	]);

	return (
		<AppShell header={<AppBar />}>
			<Text>Epic</Text>
			<RouterProvider router={router} />
		</AppShell>
	);
}

export default App;
