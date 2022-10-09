import {
	ActionIcon,
	Box,
	Divider,
	Group,
	Paper,
	Title,
	Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash, IconX } from "@tabler/icons";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Edit from "../lib/components/common/Edit";
import View from "../lib/components/common/View";
import { useDebt } from "../lib/hooks/useDebt";
import { DebtEntryWithId } from "../lib/types/debt";

export const DebtLoader = ({
	params,
}: {
	params: {
		id?: string;
	};
}): string => {
	if (!params.id) throw new Error("It seems this Debt doesn't exist anymore");

	return params.id;
};

const Debt = ({}) => {
	const id = useLoaderData() as ReturnType<typeof DebtLoader>;
	const [debt] = useDebt(id);
	const [editable, setEditable] = useState(false);

	return (
		<Box>
			<Paper p="sm">
				<div>
					<Group position="apart">
						<Title order={2}>{debt?.reason}</Title>
						<Group>
							<Tooltip label={!editable ? "Edit" : "Cancel"}>
								<ActionIcon
									onClick={() => {
										setEditable(!editable);
									}}
								>
									{!editable ? <IconEdit /> : <IconX />}
								</ActionIcon>
							</Tooltip>
							<Tooltip label={"Delete"}>
								<ActionIcon>
									<IconTrash />
								</ActionIcon>
							</Tooltip>
						</Group>
					</Group>
					<Divider />
				</div>
				{editable ? (
					<Edit debt={debt as DebtEntryWithId} onSubmit={() => {}} />
				) : (
					<View debt={debt as DebtEntryWithId} />
				)}
			</Paper>
		</Box>
	);
};

export default Debt;
