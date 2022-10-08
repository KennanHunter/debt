import { AppShell } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBar from "./lib/components/scaffold/AppBar";
import Debtor from "./router/Debtor";
import Error from "./router/Error";
import Index, { IndexLoader } from "./router/Index";
import Login, { LoginLoader } from "./router/Login";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Index />,
			loader: IndexLoader,
			errorElement: <Error />,
			children: [
				{
					path: "u/:name",
					element: <Debtor />,
				},
			],
		},
		{
			path: "/login",
			element: <Login />,
			loader: LoginLoader,
			errorElement: <Error />,
		},
	]);

	return (
		<AppShell
			padding="md"
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
