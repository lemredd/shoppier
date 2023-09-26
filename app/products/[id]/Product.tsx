"use client";

import { useEffect, useState } from "react";

import type { Product } from "@/app/lib/types";

interface Props {
	id: number
}

async function get_product<T extends Product>(id: number): Promise<T> {
	return await fetch(`/api/products/${id}`)
		.then(res => res.json())
		.then(data => data as T);
}

export default function Product({ id }: Props): React.ReactNode {
	const [product, set_product] = useState<Product>();


	useEffect(() => {
		get_product(id)
			.then(set_product)
			.catch(console.error);
	}, [id]);

	return (
		<>
			{product}
		</>
	);
}
