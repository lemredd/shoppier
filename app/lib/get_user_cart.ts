import { cookies } from "next/headers";

import type { Cart, CartProduct } from "@prisma/client";

import { SERVER_URL } from "@app/lib/constants";

interface AnonymousCart {
	products: CartProduct[]
}

interface AuthenticatedUserCart extends Cart {
	products: CartProduct[]
}

type UserCart = AuthenticatedUserCart | AnonymousCart;

export default async function get_user_cart(): Promise<UserCart> {
	const auth_token = cookies().get("auth")?.value;
	return await fetch(`${SERVER_URL}/api/cart`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({ auth_token })
	}).then(
		res => res.json()
	).then((data: AuthenticatedUserCart) => {
		if (!data.id) return { "products": [] } satisfies AnonymousCart;
		return data;
	});
}
