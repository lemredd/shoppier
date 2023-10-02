import { cookies } from "next/headers";

import type { Cart } from "@prisma/client";

import { SERVER_URL } from "@app/lib/constants";

interface UserCart extends Cart {
	anonymous: boolean
}

export default async function get_user_cart(): Promise<UserCart> {
	// TODO: consider anonymous cart
	const user_id = Number(cookies().get("auth")?.value);
	return await fetch(`${SERVER_URL}/api/cart`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({ user_id })
	}).then(
		res => res.json()
	).then(
		data => data as Cart
	);
}
