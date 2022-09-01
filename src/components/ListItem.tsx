import { DBType } from "../firebase/types";

function ListItem({ reason, value, interest }: DBType) {
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
