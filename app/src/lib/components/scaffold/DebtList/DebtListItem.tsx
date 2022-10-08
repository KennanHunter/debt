import { Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { DebtEntry } from "../../../types/debt";

const DebtListItem = ({ debt }: { debt: DebtEntry }) => {
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
			to={
				"/u/" + encodeURIComponent(debt.debtor) + "/"
				// encodeURIComponent(debt)
			}
		></Box>
	);
};

export default DebtListItem;
