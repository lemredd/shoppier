"use client";

import { FormEvent, useState } from "react";

import type { Cart } from "@prisma/client";

import type { AnonymousCart, UserCart } from "@app/lib/types";

import access_anonymous_cart from "@app/lib/access_anonymous_cart";

interface Props {
	id: number
	cart: UserCart
}

function add_item_to_anonymous_cart(form_data: FormData): void {
	void access_anonymous_cart<AnonymousCart>(({ products }) => {
		form_data.delete("cart_id");
		const entries = Object.fromEntries(form_data); // TODO: validate

		products.push({
			"id": products.length + 1,
			"productId": Number(entries.product_id),
			"quantity": Number(entries.quantity)
		});
	});
}

export default function AddToCartForm({ id, cart }: Props): React.ReactElement {
	const is_anonymous = "id" in cart === false;
	const [is_adding_item, set_is_adding_item] = useState<boolean>();

	function add_to_cart(event: FormEvent): void {
		event.preventDefault();
		const form_data = new FormData(event.target as HTMLFormElement);
		if (is_anonymous) {
			add_item_to_anonymous_cart(form_data);
			return;
		}

		fetch("/api/cart/add_item", {
			"method": "POST",
			"body": form_data
		}).then(
			res => res.json()
		).then(data => {
			if ("name" in data && "issues" in data) console.error(data);
			return data as UserCart;
		}).catch(console.error);
	}

	return (
		<>
			<button type="button" id="add-to-cart-btn" onClick={(): void => set_is_adding_item(true)}>Add to cart</button>
			<dialog open={is_adding_item}>
				<form onSubmit={add_to_cart} method="POST">
					<input type="hidden" name="cart_id" defaultValue={(cart as Cart).id} />
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
