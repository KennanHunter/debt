import React from "react";
import { DBType } from "../firebase/types";
import ListItem from "./ListItem";

interface ListGroupProps {
	debtor: string;
	arr: DBType[];
}
function ListGroup({ arr, debtor }: ListGroupProps) {
	return (
		<div>
			<h2>{debtor}</h2>
			<ul>
				{arr.map((item) => (
					<ListItem {...item}></ListItem>
				))}
			</ul>
		</div>
	);
}

export default ListGroup;
