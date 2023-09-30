"use client";

import { useEffect, useState } from "react";

import { Cart } from "@prisma/client";

import type { Product } from "@/app/lib/types";

import get_product from "@app/products/lib/get_product";

interface Props {
	id: number
	cart: Cart
}

export default function Product({ id, cart }: Props): React.ReactNode {
	const [product, set_product] = useState<Product>();

	useEffect(() => {
		get_product(id)
			.then(set_product)
			.catch(console.error);
	}, [id]);

	function add_to_cart(): void {
		
	}

	return (
		<>
			{/*
			* TODO: wrap with semantic HTML
			* TODO: Display the rest of product details
			*/}
			{product?.title}
			<button onClick={add_to_cart}>Add to cart</button>
		</>
	);
}
