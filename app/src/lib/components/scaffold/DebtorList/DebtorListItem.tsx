import { Box, Group } from "@mantine/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DebtEntry } from "../../../types/debt";

interface DebtorListItemProps {
	debtor: string;
	arr: DebtEntry[];
}

const DebtorListItem = ({ debtor, arr }: DebtorListItemProps) => {
	const sum = useMemo(
		() => arr.reduce((prev, current) => prev + current.value, 0),
		[arr]
	);
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
			to={"/u/" + encodeURIComponent(debtor)}
		>
			<Group position="apart">
				<span>{debtor}</span>
				<span style={{ color: "green" }}>${sum.toFixed(2)}</span>
			</Group>
		</Box>
	);
};

export default DebtorListItem;
