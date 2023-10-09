"use client";

import { FormEvent, useState } from "react";

import type { CartProduct } from "@prisma/client";

import type{ AnonymousCart, AnonymousCartProduct } from "@app/lib/types";

interface Props {
	item: CartProduct | AnonymousCartProduct
}

interface EditCartItemFormProps extends Pick<CartProduct, "id" | "quantity"> {
	is_anonymous: boolean
}

function EditCartItemForm({ id, quantity, is_anonymous }: EditCartItemFormProps): React.ReactElement {
	// TODO: consider anonymous cart
	function update(event: FormEvent): void {
		event.preventDefault();
		const form_data = new FormData(event.target as HTMLFormElement);
		const entries = Object.fromEntries(form_data); // TODO: validate
		if (is_anonymous) {
			const anonymous_cart = JSON.parse(localStorage.getItem("cart")!) as AnonymousCart || { "products": [] };
			const index = anonymous_cart.products.findIndex(item => item.id === id);
			anonymous_cart.products[index].quantity = Number(entries.quantity);

			localStorage.setItem("cart", JSON.stringify(anonymous_cart));
			return;
		}

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
		if(is_anonymous) {
			return;
		}

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
			{is_editing && <EditCartItemForm id={item.id} quantity={item.quantity} is_anonymous={"cartId" in item === false} />}
		</li>
	);
}

