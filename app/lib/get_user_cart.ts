import { cookies } from "next/headers";

import { SERVER_URL } from "@app/lib/constants";

import { UserCart } from "@app/lib/types";


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
