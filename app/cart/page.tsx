import get_user_cart from "@app/lib/get_user_cart";

export default async function Page(): Promise<React.ReactElement> {
	const cart = await get_user_cart();
	console.log(cart);
	return (
		<main>
			root page
		</main>
	);
}
