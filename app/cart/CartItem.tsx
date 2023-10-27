"use client";

import { FormEvent, useState } from "react";

import type { CartItems } from "@prisma/client";

import type{ AnonymousCart, AnonymousCartItem } from "@app/lib/types";

import access_anonymous_cart from "@app/lib/access_anonymous_cart";

interface Props {
	item: CartItems | AnonymousCartItem
}

interface EditCartItemFormProps extends Pick<CartItems, "id" | "quantity"> {
	is_anonymous: boolean
}

function EditCartItemForm({ id, quantity, is_anonymous }: EditCartItemFormProps): React.ReactElement {
	// TODO: consider anonymous cart
	function update(event: FormEvent): void {
		event.preventDefault();
		const form_data = new FormData(event.target as HTMLFormElement);
		const entries = Object.fromEntries(form_data); // TODO: validate

		// TODO: show error on UI
		// TODO: show success message on UI
		if (!is_anonymous) fetch(`/api/cart_item/${id}`, {
			"method": "PATCH",
			"body": form_data
		}).catch(console.error);

		else access_anonymous_cart<AnonymousCart>(({ products }) => {
			const index = products.findIndex(item => item.id === id);
			products[index].quantity = Number(entries.quantity);
		});
	}

	// TODO: Show confirmation dialog before deleting;
	function delete_cart_item(): void {
		// TODO: show error on UI
		// TODO: show success message on UI
		if (!is_anonymous) fetch(`/api/cart_item/${id}`, {
			"method": "DELETE"
		}).catch(console.error);

		else access_anonymous_cart<AnonymousCart>(({ products }) => {
			const index = products.findIndex(item => item.id === id);
			products.splice(index, 1);
		});
	}

	return (
		<>
			<form onSubmit={update} method="PATCH">
				<label>Quantity: <input type="number" name="quantity" defaultValue={quantity} /></label>
				<input type="submit" value="Update" />
				{/* TODO: show confirmation dialog before deleting */}
				<button type="button" onClick={delete_cart_item}>Remove</button>
			</form>
		</>
	);
}

export default function CartItem({ item }: Props): React.ReactElement {
	const [is_editing, set_is_editing] = useState(false);

	return (
		<li>
			{/* TODO: show important (name) of cart item */}
			<h1>{item.product_id}</h1>
			<button onClick={(): void => set_is_editing(!is_editing)}>{!is_editing ? "Modify" : "Cancel"}</button>
			{is_editing && <EditCartItemForm id={item.id} quantity={item.quantity} is_anonymous={"cart_id" in item === false} />}
		</li>
	);
}

