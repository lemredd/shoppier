import { cookies } from "next/headers";

import type { Cart, CartProduct } from "@prisma/client";

import { SERVER_URL } from "@app/lib/constants";

interface AnonymousCart {
	products: Omit<CartProduct, "cartId">[]
}

interface AuthenticatedUserCart extends Cart {
	products: CartProduct[]
}

// TODO: centralize type
export type UserCart = AuthenticatedUserCart | AnonymousCart;

export default async function get_user_cart(): Promise<UserCart> {
	const auth_token = cookies().get("auth")?.value; // Until server actions become stable (currently experimental), this cookie getter will always be called in a layout/page.
	return await fetch(`${SERVER_URL}/api/cart`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({ auth_token })
	})
		.then(res => res.json())
		.then(data => data as UserCart);
}
