import {
	ActionIcon,
	Box,
	Divider,
	Group,
	Paper,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconTrash, IconX } from "@tabler/icons";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Edit from "../lib/components/common/Edit";
import Load from "../lib/components/common/Load";
import View from "../lib/components/common/View";
import { db } from "../lib/firebase/firebase";
import { useDebt } from "../lib/hooks/useDebt";
import { DebtEntryWithId } from "../lib/types/debt";
import { stripId } from "../lib/util/stripId";

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
	const [debt, loading] = useDebt(id);
	const [editable, setEditable] = useState(false);
	const navigate = useNavigate();

	if (loading) return <Load />;
	if (!debt) throw new Error("Fuck");

	const openDeleteConfirmationMenu = () =>
		openConfirmModal({
			title: "Confirm Delete",
			children: (
				<Text>
					Are you sure you want to delete this Debt? This Action is
					irreversible
				</Text>
			),
			labels: { confirm: "Delete", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => {},
			onConfirm: () => {
				deleteDoc(doc(db, "debts", debt?.id));
				navigate("/u/" + encodeURIComponent(debt?.debtor));
			},
		});
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
								<ActionIcon
									onClick={openDeleteConfirmationMenu}
								>
									<IconTrash />
								</ActionIcon>
							</Tooltip>
						</Group>
					</Group>
					<Divider />
				</div>
				{editable ? (
					<Edit
						debt={debt as DebtEntryWithId}
						onSubmit={(form) => {
							setDoc(doc(db, "debts", form.values["id"]), {
								...stripId(form.values),
							});
							setEditable(false);
						}}
					/>
				) : (
					<View debt={debt as DebtEntryWithId} />
				)}
			</Paper>
		</Box>
	);
};

export default Debt;
