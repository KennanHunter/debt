import { Box, Group, Stack } from "@mantine/core";
import { DebtEntryWithId } from "../../types/debt";
import Money from "./Money";

const View = ({ debt }: { debt: DebtEntryWithId }) => {
	return (
		<Box>
			<Stack>
				<Box>
					<Group>
						<span>Value</span>
						<Money value={debt.value} />
					</Group>
				</Box>
			</Stack>
		</Box>
	);
};

export default View;
