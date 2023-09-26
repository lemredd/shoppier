"use client";

import { useEffect, useState } from "react";

import type { Product } from "@/app/lib/types";

import get_product from "@app/products/lib/get_product";

interface Props {
	id: number
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
			{/*
			* TODO: wrap with semantic HTML
			* TODO: Display the rest of product details
			*/}
			{product?.title}
		</>
	);
}
