"use client";

import { useEffect, useState } from "react";

interface Props {
	keyword: string
}

interface Product extends Record<string, any> {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: Array<string>
}


interface ProductsList extends Record<string, any> {
	products: Product[]
	total: number
	skip: number
	limit: number
}


export default function Results({ keyword }: Props): React.ReactElement {
	const [products, set_products] = useState<Product[]>([]);
	
	useEffect(() => {
		async function search_products<T extends ProductsList>(): Promise<T>{
			//TODO: handle possible errors!
			//i.e. example in https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
			const response =  await fetch(`/api/products/search?keyword=${keyword}`);
			const result = await response.json() as T;

			return result;
		}

		search_products()
			.then(result => set_products(result.products))
			.catch(console.error);
	}, [keyword]);
	
	return (
		<ul className="results">
			{products.map(product => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}
