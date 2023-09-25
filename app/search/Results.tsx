"use client";

import { useEffect, useState } from "react";

interface Props {
	keyword: string
}

export default function Results({ keyword }: Props): React.ReactElement {
	const [products, set_products] = useState<Record<string, any>[]>([]);
	
	useEffect(() => {
		async function search_products<T extends Record<string, any>>(): Promise<T>{
			const response =  await fetch(`/api/products/search?keyword=${keyword}`);
			const result = await response.json() as T;

			return result;
		}

		search_products()
			.then(result => set_products(result.products as Record<string, any>[]))
			.catch(console.error);
	}, [keyword]);
	
	return (
		<ul className="results">
			{products.map((product: Record<string, any>) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}
