import { DebtEntryWithID } from "../firebase/dbTypes";

function ListItem({ reason, value, interest }: DebtEntryWithID) {
	return (
		<li>
			<div>
				<h3>{reason}</h3>
				<p>
					${value.toFixed(2)} <br />
					at {interest}% Interest
				</p>
			</div>
		</li>
	);
}

export default ListItem;
