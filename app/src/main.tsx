import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider
			theme={{ colorScheme: "dark" }}
			withGlobalStyles
			withNormalizeCSS
		>
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</MantineProvider>
	</React.StrictMode>
);
