interface Props {
	keyword: string
}
export default function Results({ keyword }: Props): React.ReactElement {
	return (
		<ul className="results">
			{products.map((product: Record<string, any>) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}
