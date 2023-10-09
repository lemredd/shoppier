"use client";

import { ZodError } from "zod";

import { UserCart } from "@app/lib/types";

import access_anonymous_cart from "@app/lib/access_anonymous_cart";

import CartItem from "./CartItem";

interface Props {
	cart: UserCart
}

export default function Cart({ cart }: Props): React.ReactElement {
	const is_anonymous = "id" in cart === false;
	let anonymous_cart_issue;

	if (is_anonymous) {
		const { issues } = is_anonymous && cart as unknown as ZodError; // TODO: this seems ugly. fix it.
		anonymous_cart_issue = issues[0];
		cart = access_anonymous_cart<UserCart>();
	}

	const { products } = cart;
	return (
		<>
			{is_anonymous && <p>{anonymous_cart_issue?.message}</p>}
			{products.length && products.map(product => (
				<CartItem key={product.productId} item={product} />
			)) || "You have no items in your cart yet."}
		</>
	);
}
