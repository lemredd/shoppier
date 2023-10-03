"use client";

import { useState } from "react";

import type { CartProduct } from "@prisma/client";

interface Props {
	item: CartProduct
}

function EditCartItemForm({ id, quantity }: Pick<CartProduct, "id" | "quantity">): React.ReactElement {
	function update(): void {
		console.log;
	}

	return (
		<form>
			<label>Quantity: <input type="number" defaultValue={quantity} /></label>
			<input type="submit" value="Update" onClick={update} />
		</form>
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

