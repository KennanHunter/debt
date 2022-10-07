import { Center, Paper, Stack, Title } from "@mantine/core";
import Google from "../lib/components/auth/Google";

export const LoginLoader = () => {};

const Login = () => {
	return (
		<main>
			<Center>
				<Paper shadow="xs" p="xl">
					<Stack>
						<Title size={"h4"}>Login</Title>
						<Google />
					</Stack>
				</Paper>
			</Center>
		</main>
	);
};

export default Login;
