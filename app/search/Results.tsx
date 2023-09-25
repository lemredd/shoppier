"use client";

import { useEffect, useState } from "react";

interface Props {
	keyword: string
}

export default function Results({ keyword }: Props): React.ReactElement {
	const [products, set_products] = useState<Record<string, any>[]>([]);
	
	
	return (
		<ul className="results">
			{products.map((product: Record<string, any>) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}
