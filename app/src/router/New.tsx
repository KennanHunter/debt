import { Box, Center, Divider, Paper, Text } from "@mantine/core";
import { addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Edit from "../lib/components/common/Edit";
import Load from "../lib/components/common/Load";
import { debtCollection } from "../lib/firebase/firebase";
import { useUser } from "../lib/hooks/useUser";
import { TimePeriod } from "../lib/types/timePeriod";
import { stripId } from "../lib/util/stripId";

export const NewLoader = () => {};

const New = () => {
	const navigate = useNavigate();
	const [user, loading] = useUser();

	if (loading) return <Load />;

	return (
		<Center>
			<Paper p="md">
				<Box p="sm">
					<Text>New Debt</Text>
					<Divider />
				</Box>
				<Edit
					debt={{
						id: "",
						uid: user?.uid || "",
						value: 0,
						reason: "",
						debtor: "",
						interest: 0,
						interestTimespan: TimePeriod.Day,
						creationDate: Timestamp.now(),
					}}
					onSubmit={async (form) => {
						const docRef = await addDoc(
							debtCollection,
							stripId(form.values)
						);
						console.table(form.values);
						navigate(
							"/u/" +
								encodeURIComponent(form.values["debtor"]) +
								"/" +
								encodeURIComponent(docRef.id)
						);
					}}
				/>
			</Paper>
		</Center>
	);
};

export default New;
