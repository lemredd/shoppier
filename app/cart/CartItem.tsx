"use client";

import { FormEvent, useState } from "react";

import type { CartProduct } from "@prisma/client";

interface Props {
	item: CartProduct
}

function EditCartItemForm({ id, quantity }: Pick<CartProduct, "id" | "quantity">): React.ReactElement {
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

	function delete_cart_item(): void {
		console.log();
	}

	return (
		<>
			<form onSubmit={update} method="PATCH">
				<label>Quantity: <input type="number" name="quantity" defaultValue={quantity} /></label>
				<input type="submit" value="Update" />
				<button type="button" onClick={delete_cart_item}>Remove</button>
			</form>
		</>
	);
}

export default function CartItem({ item }: Props): React.ReactElement {
	const [is_editing, set_is_editing] = useState(false);

	return (
		<li>
			<h1>{item.id}</h1>
			<button onClick={(): void => set_is_editing(!is_editing)}>{!is_editing ? "Modify" : "Cancel"}</button>
			{is_editing && <EditCartItemForm id={item.id} quantity={item.quantity} />}
		</li>
	);
}

