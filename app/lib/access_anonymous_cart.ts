import { UserCart } from "@app/lib/types";

export default function access_anonymous_cart<T = UserCart>(
	mutate_products?: (cart: T) => void
): T {
	const cart = JSON.parse(localStorage.getItem("cart")!) as T
		|| { "products": [] } as T;
	if (mutate_products) mutate_products(cart);
	localStorage.setItem("cart", JSON.stringify(cart));

	return cart;
}

