import Link from "next/link";
import { DebtEntryWithID } from "../firebase/dbTypes";
import { processInterest } from "../util/processInterest";

function ListItem(debtEntry: DebtEntryWithID) {
	return (
		<li>
			<Link href={"/"+ debtEntry.id}>
				<div>
					<h3>{debtEntry.reason}</h3>
					{(() => {
						return debtEntry.interest ? (
							<p>
								$
								{processInterest(
									debtEntry
								).adjustedValue.toFixed(2)}{" "}
								<br />
								(${debtEntry.value.toFixed(2)} before interest)
								<br />
								at {debtEntry.interest}% interest per{" "}
								{debtEntry.interestTimespan.toLocaleLowerCase()}
								<br />
								created{" "}
								{debtEntry.creationDate.toDate().toDateString()}
							</p>
						) : (
							<p>
								${debtEntry.value.toFixed(2)}
								<br />
								created{" "}
								{debtEntry.creationDate.toDate().toDateString()}
							</p>
						);
					})()}
				</div>
			</Link>
		</li>
	);
}

export default ListItem;
