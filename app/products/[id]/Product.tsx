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
	const [is_adding_item, set_is_adding_item] = useState<boolean>();

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
			<button type="button" onClick={(): void => set_is_adding_item(true)}>Add to cart</button>
			<dialog open={is_adding_item}>
				<form onSubmit={add_to_cart} method="POST">
					<input type="hidden" name="id" defaultValue={cart.id} />
					<input type="hidden" name="product_id" defaultValue={id} />
					<input type="number" name="quantity" defaultValue={1} />
					<input type="submit" value="Add to Cart" />
				</form>
				
				<button
					type="button"
					onClick={(): void => set_is_adding_item(false)}
				>
					cancel
				</button>
			</dialog>
		</>
	);
}
