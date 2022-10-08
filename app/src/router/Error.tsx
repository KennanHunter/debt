import { Center, Title } from "@mantine/core";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();

	return (
		<Center>
			<Title>{(error as any)?.statusText || "Unknown Error"}</Title>
		</Center>
	);
};

export default Error;
