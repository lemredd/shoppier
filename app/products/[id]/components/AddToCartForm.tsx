"use client";

import { FormEvent, useState } from "react";

import { Cart } from "@prisma/client";

interface Props {
	id: number
	cart: Cart
}

export default function AddToCartForm({ id, cart }: Props): React.ReactElement {
	const [is_adding_item, set_is_adding_item] = useState<boolean>();

	function add_to_cart(event: FormEvent): void {
		event.preventDefault();
		const form_data = new FormData(event.target as HTMLFormElement);

		fetch("/api/cart/add_item", {
			"method": "POST",
			"body": form_data
		}).then(console.log).catch(console.error);
	}

	return (
		<>
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
