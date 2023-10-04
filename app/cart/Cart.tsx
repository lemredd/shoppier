"use client";

import { UserCart } from "@app/lib/get_user_cart";

import CartItem from "./CartItem";
import { NO_AUTH_TOKEN_PROVIDED_MESSAGE as ANONYMOUS_CART_WARN_MESSAGE } from "@app/lib/constants";

interface Props {
	cart: UserCart
}
export default function Cart({ cart }: Props): React.ReactElement {
	const is_anonymous = "id" in cart === false;
	if (is_anonymous) {
		cart = JSON.parse(localStorage.getItem("cart")!) as UserCart
			|| { "products": [] };
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const { products } = cart;
	return (
		<>
			{is_anonymous && <p>{ANONYMOUS_CART_WARN_MESSAGE}</p>}
			{products.length && products.map(product => (
				<CartItem key={product.id} item={product} />
			)) || "You have no items in your cart yet."}
		</>
	);
}
