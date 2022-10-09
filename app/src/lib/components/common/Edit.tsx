import { Box, Button, NumberInput } from "@mantine/core";
import { DebtEntryWithId } from "../../types/debt";

import { useForm } from "@mantine/form";
import { useEffect } from "react";

const Edit = ({
	onSubmit,
	debt,
}: {
	onSubmit: () => any;
	debt: DebtEntryWithId;
}) => {
	const form = useForm({
		initialValues: { ...(debt as DebtEntryWithId) },
	});

	// This shouldn't be needed but whatever
	useEffect(() => {
		if (!form.isDirty()) form.setValues(debt as DebtEntryWithId);
	}, [debt]);

	return (
		<Box p="xs">
			<NumberInput
				label="Initial Value"
				withAsterisk
				styles={(theme) => ({ input: { color: "white" } })}
				{...form.getInputProps("value")}
			/>
			<Button mt="sm" type="submit">
				Save
			</Button>
		</Box>
	);
};

export default Edit;
