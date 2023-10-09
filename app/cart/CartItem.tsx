"use client";

import { FormEvent, useState } from "react";

import type { CartProduct } from "@prisma/client";
import { AnonymousCartProduct } from "@app/lib/types";

interface Props {
	item: CartProduct | AnonymousCartProduct
}

function EditCartItemForm({ id, quantity }: Pick<CartProduct, "id" | "quantity">): React.ReactElement {
	// TODO: consider anonymous cart
	function update(event: FormEvent): void {
		event.preventDefault();

		const form_data = new FormData(event.target as HTMLFormElement);

		// TODO: show error on UI
		// TODO: show success message on UI
		fetch(`/api/cart_item/${id}`, {
			"method": "PATCH",
			"body": form_data
		}).catch(console.error);
	}

	// TODO: Show confirmation dialog before deleting;
	function delete_cart_item(): void {
		// TODO: show error on UI
		// TODO: show success message on UI
		fetch(`/api/cart_item/${id}`, {
			"method": "DELETE"
		}).catch(console.error);
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
			<h1>{item.productId}</h1>
			<button onClick={(): void => set_is_editing(!is_editing)}>{!is_editing ? "Modify" : "Cancel"}</button>
			{is_editing && <EditCartItemForm id={item.id} quantity={item.quantity} />}
		</li>
	);
}

