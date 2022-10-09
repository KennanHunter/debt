const Money = ({ value }: { value: number }) => (
	<span style={{ color: "green" }}>${value.toFixed(2)}</span>
);

export default Money;
