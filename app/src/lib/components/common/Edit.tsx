import { IconChevronDown } from "@tabler/icons";

import {
	Autocomplete,
	Box,
	Button,
	Center,
	Group,
	NativeSelect,
	NumberInput,
	Paper,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconCurrencyDollar, IconPercentage } from "@tabler/icons";
import { useEffect } from "react";
import { useAllDebtors } from "../../hooks/useAllDebtors";
import { DebtEntryWithId } from "../../types/debt";
import { TimePeriod } from "../../types/timePeriod";

const Edit = ({
	onSubmit,
	debt,
	width = "100%",
}: {
	onSubmit: (form: UseFormReturnType<DebtEntryWithId>) => any;
	debt: DebtEntryWithId;
	width?: number | string;
}) => {
	const form = useForm({
		initialValues: { ...(debt as DebtEntryWithId) },
		validate: {
			reason: (val) => (val === "" ? "Required" : null),
			debtor: (val) => (val === "" ? "Required" : null),
		},
	});
	const [debtors] = useAllDebtors();

	// This shouldn't be needed but whatever
	useEffect(() => {
		if (!form.isDirty()) form.setValues(debt as DebtEntryWithId);
	}, [debt]);

	return (
		<Box p="xs" style={{ width: width }}>
			<Group grow>
				<Stack>
					<NumberInput
						label="Initial Value"
						required
						precision={2}
						icon={<IconCurrencyDollar />}
						{...form.getInputProps("value")}
					/>
					<Autocomplete
						required
						label={"Debtor"}
						description={"Who is in debt to you?"}
						data={debtors || []}
						{...form.getInputProps("debtor")}
					/>
					<TextInput
						required
						label="Reason"
						{...form.getInputProps("reason")}
					/>
					<TextInput
						label="Collateral"
						{...form.getInputProps("collateral")}
					/>
				</Stack>
				<Stack>
					<Paper>
						<Text>TODO: Graph interest</Text>
					</Paper>
					<NumberInput
						label="Interest Rate"
						precision={2}
						step={0.25}
						icon={<IconPercentage />}
						{...form.getInputProps("interest")}
					/>
					<Box>
						<NativeSelect
							label={"Compounding Time"}
							data={[
								{
									value: TimePeriod.None,
									label: "Don't Compound",
								},
								{ value: TimePeriod.Day, label: "Every Day" },
								{ value: TimePeriod.Week, label: "Every Week" },
								{
									value: TimePeriod.Month,
									label: "Every Month",
								},
							]}
							rightSection={<IconChevronDown size={14} />}
							rightSectionWidth={40}
							disabled={form.values["interest"] === 0}
							{...form.getInputProps("interestTimespan")}
						/>
						{form.values["interestTimespan"] ===
						TimePeriod.Month ? (
							<Text p="xs">
								A month is defined as once every 30 days.
							</Text>
						) : (
							<></>
						)}
					</Box>
				</Stack>
			</Group>
			<Center>
				<Button
					mt="sm"
					type="submit"
					onClick={() => {
						if (form.validate().hasErrors) return;
						onSubmit(form);
					}}
				>
					Save
				</Button>
			</Center>
		</Box>
	);
};

export default Edit;
