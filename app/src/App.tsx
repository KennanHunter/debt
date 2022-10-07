import { AppShell, Header, Navbar, Text } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBar from "./lib/components/scaffold/AppBar";
import Index, { IndexLoader } from "./router/Index";

function App() {
	const router = createBrowserRouter([
		{ path: "/", element: <Index />, loader: IndexLoader },
	]);

	return (
		<AppShell
			padding="md"
			// navbar={}
			header={<AppBar />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			<RouterProvider router={router}></RouterProvider>
		</AppShell>
	);
}

export default App;
