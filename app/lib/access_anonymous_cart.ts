import { UserCart } from "@app/lib/types";

export default function access_anonymous_cart<T = UserCart>(): T {
	const cart = JSON.parse(localStorage.getItem("cart")!) as T
		|| { "products": [] };
	localStorage.setItem("cart", JSON.stringify(cart));

	return cart as T;
}

