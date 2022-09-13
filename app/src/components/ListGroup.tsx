import { DebtEntryWithID } from "../firebase/dbTypes";
import ListItem from "./ListItem";

interface ListGroupProps {
	debtor: string;
	arr: DebtEntryWithID[];
}

function ListGroup({ debtor, arr }: ListGroupProps) {
	return (
		<div>
			<h2>{debtor}</h2>
			<ul>
				{arr.map((item) => (
					<ListItem key={item.id} {...item}></ListItem>
				))}
			</ul>
		</div>
	);
}

export default ListGroup;
