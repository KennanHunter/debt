import { addDoc, doc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DebtEntry } from "../firebase/dbTypes";
import { auth, db, debtCollection } from "../firebase/firebase";
import { TimePeriod } from "../firebase/timePeriod";

const New = () => {
	const [user] = useAuthState(auth);
	const router = useRouter();

	const { id } = router.query;

	const [preexistingData, loading, error, snapshot] = useDocumentData(
		doc(db, "debts", id || "")
	);
	

	const submitNewDebt = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) {
			alert("Fuck");
			return;
		}
		if (!amount || !debtor || !reason) alert("Please answer all required");
		addDoc(debtCollection, {
			reason,
			debtor,
			value: amount,
			interest,
			interestTimespan,
			collateral,
			uid: user.uid,
			creationDate: Timestamp.now(),
		} as DebtEntry);
		router.push("/");
	};

	const [editMode, setEditMode] = useState(id === "new");
	const [reason, setReason] = useState("");
	const [debtor, setDebtor] = useState("");
	const [amount, setAmount] = useState<number | string>(0);

	const [interest, setInterest] = useState(0);
	const [interestTimespan, setInterestTimespan] = useState(TimePeriod.Day);

	useEffect(() => {
		if (!preexistingData) alert("ugh");
		return;
	});

	useEffect(() => {
		console.log(interestTimespan);
	}, [interestTimespan]);

	const [collateral, setCollateral] = useState("");

	return (
		<div>
			<noscript>Must have Javascript enabled to use this form</noscript>
			<h1>{id ? reason : "New"}</h1>
			<form onSubmit={submitNewDebt} autoComplete="off">
				<div>
					<label htmlFor="reason">Reason:</label>

					<input
						type="text"
						name="reason"
						id="reason"
						value={reason}
						onChange={(e) => {
							if (!editMode) return;
							setReason(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="debtor">Debtor:</label>
					<input
						type="text"
						name="debtor"
						id="debtor"
						value={debtor}
						onChange={(e) => {
							if (!editMode) return;
							setDebtor(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="amount">Amount:</label>
					{"  "}$
					<input
						type="number"
						name="amount"
						id="amount"
						value={amount}
						onChange={(e) => {
							if (!editMode) return;
							if (e.target.value === "") setAmount("");
							setAmount(Number(e.target.value));
						}}
					/>
				</div>

				<p>
					<em>Optional</em>
				</p>
				<div>
					<label htmlFor="interest">Interest Rate:</label>
					<br />
					<input
						type="text"
						name="interest"
						id="interest"
						value={interest}
						onChange={(e) => {
							if (!editMode) return;
							setInterest(Number(e.target.value));
						}}
					/>
					% increase every
					<select
						name="interestTimespan"
						id="interestTimespan"
						onChange={(e) => {
							if (!editMode) return;
							setInterestTimespan(e.target.value as TimePeriod);
						}}
					>
						<option value="DAY">Day</option>
						<option value="WEEK">Week</option>
						<option value="MONTH">Month</option>
					</select>
					{(() => {
						return interestTimespan === TimePeriod.Month ? (
							<em>
								<br />
								Months are defined as every 30 days from debt
								creation
							</em>
						) : (
							""
						);
					})()}
				</div>
				<div>
					<label htmlFor="collateral">Collateral:</label>
					<input
						type="text"
						name="collateral"
						id="collateral"
						onChange={(e) => {
							if (!editMode) return;
							setCollateral(e.target.value);
						}}
					/>
				</div>
				{(() => {
					if (editMode)
						return <input type="submit" value="Create new Debt" />;
				})()}
			</form>
		</div>
	);
};

export default New;
