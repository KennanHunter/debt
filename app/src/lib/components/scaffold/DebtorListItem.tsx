import { Box, Group } from "@mantine/core";
import { Link } from "react-router-dom";

const DebtorListItem = (props: { name: string; value: number }) => {
	return (
		<Box
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.gray[0],
				textAlign: "center",
				padding: theme.spacing.xl,
				borderRadius: theme.radius.md,
				cursor: "pointer",
				color: "white",
				textDecoration: "none",

				"&:hover": {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[5]
							: theme.colors.gray[1],
				},
			})}
			component={Link}
			to={"/u/" + props.name}
		>
			<Group position="apart">
				<span>{props.name}</span>
				<span style={{ color: "green" }}>
					${props.value.toFixed(2)}
				</span>
			</Group>
		</Box>
	);
};

export default DebtorListItem;
