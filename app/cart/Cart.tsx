"use client";

import { ZodError } from "zod";

import { UserCart } from "@app/lib/get_user_cart";

import CartItem from "./CartItem";

interface Props {
	cart: UserCart
}
export default function Cart({ cart }: Props): React.ReactElement {
	const is_anonymous = "id" in cart === false;
	const { issues } = cart as unknown as ZodError; // TODO: this seems ugly. fix it.
	const [anonymous_cart_issue] = issues;

	if (is_anonymous) {
		cart = JSON.parse(localStorage.getItem("cart")!) as UserCart
			|| { "products": [] };
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const { products } = cart;
	return (
		<>
			{is_anonymous && <p>{anonymous_cart_issue.message}</p>}
			{products.length && products.map(product => (
				<CartItem key={product.id} item={product} />
			)) || "You have no items in your cart yet."}
		</>
	);
}
