import { cookies } from "next/headers";

import type { Cart } from "@prisma/client";

import { SERVER_URL } from "@app/lib/constants";

async function get_user_cart(user_id: number): Promise<Cart> {
	// TODO: consider anonymous cart
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
export default async function Page(): Promise<React.ReactElement> {
	const auth = cookies().get("auth");
	const cart = auth?.value ? await get_user_cart(Number(auth.value)) : undefined;
	console.log(cart);
	return (
		<main>
			root page
		</main>
	);
}
