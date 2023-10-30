"use client";

import { output } from "zod";
import { FormEvent, useState } from "react";

import type { Carts } from "@prisma/client";

import { cart_item_form_data_schema, type AnonymousCart, type UserCart } from "@app/lib/types";

import access_anonymous_cart from "@app/lib/access_anonymous_cart";
import { NO_AUTH_TOKEN_PROVIDED_MESSAGE } from "@/app/lib/constants";

interface Props {
	id: number
	cart: UserCart
}

const form_data_schema = cart_item_form_data_schema.pick({
	"product_id": true,
	"quantity": true
});
type FormDataEntries = output<typeof form_data_schema>;

function add_item_to_anonymous_cart(form_data: FormData): void {
	const entries = Object.fromEntries(form_data) as FormDataEntries;

	try {
		form_data_schema.parse(entries);
	} catch (e) {
		console.error(e); // TODO: show in UI
	}

	void access_anonymous_cart<AnonymousCart>(({ products }) => {
		form_data.delete("cart_id");

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
			<button type="button" aria-label="Add to cart" onClick={(): void => set_is_adding_item(true)}>Add to cart</button>
			<dialog open={is_adding_item}>
				{is_anonymous && <p>{NO_AUTH_TOKEN_PROVIDED_MESSAGE}</p>}
				<form onSubmit={add_to_cart} method="POST">
					<input type="hidden" name="cart_id" defaultValue={(cart as Carts).id} />
					<input type="hidden" name="product_id" defaultValue={id} />
					<input type="number" name="quantity" defaultValue={1} />
					<input type="submit" value="Add to Cart" />
				</form>
				
				<button
					type="button"
					aria-label="Cancel"
					onClick={(): void => set_is_adding_item(false)}
				>
					cancel
				</button>
			</dialog>
		</>
	);
}
