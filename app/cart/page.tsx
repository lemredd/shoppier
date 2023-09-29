import { SERVER_URL } from "@app/lib/constants";

async function get_user_cart(user_id: number): Promise<any> {
	return await fetch(`${SERVER_URL}/api/cart`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({ user_id })
	}).then(
		res => res.json()
	).then(
		data => data as Record<string, any>
	);
}
export default async function Page(): Promise<React.ReactElement> {
	// TODO: find a way to preload
	if (typeof window !== "undefined") {
		const current_user = JSON.parse(localStorage.getItem("user") as string);
		const data = await get_user_cart(Number(current_user.id));
		console.log(data);
	}
	return (
		<main>
			root page
		</main>
	);
}
