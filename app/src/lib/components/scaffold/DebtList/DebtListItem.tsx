import { Box, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { DebtEntryWithId } from "../../../types/debt";
import Money from "../../common/Money";

const DebtListItem = ({ debt }: { debt: DebtEntryWithId }) => {
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
				"/u/" +
				encodeURIComponent(debt.debtor) +
				"/" +
				encodeURIComponent(debt.id)
			}
		>
			<Group position="apart">
				<span>{debt.reason}</span>
				<Money value={debt.value} />
			</Group>
		</Box>
	);
};

export default DebtListItem;
