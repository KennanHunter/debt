import { Box, Group, Stack } from "@mantine/core";
import { DebtEntryProcessed, DebtEntryWithId } from "../../types/debt";
import Money from "./Money";

const View = ({ debt }: { debt: DebtEntryProcessed }) => {
	return (
		<Box>
			<Stack>
				<Box>
					<Group>
						<span>Value</span>
						<Money value={debt.adjustedValue} />
					</Group>
				</Box>
			</Stack>
		</Box>
	);
};

export default View;
