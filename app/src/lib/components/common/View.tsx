import { Box, Group, Stack } from "@mantine/core";
import { DebtEntryWithId } from "../../types/debt";

const View = ({ debt }: { debt: DebtEntryWithId }) => {
	return (
		<Box>
			<Stack>
				<Box>
					<Group>
						<span>Value</span>
						<span>{debt.value}</span>
					</Group>
				</Box>
			</Stack>
		</Box>
	);
};

export default View;
