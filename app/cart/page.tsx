import get_user_cart from "@app/lib/get_user_cart";
import CartItem from "./CartItem";

export default async function Page(): Promise<React.ReactElement> {
	const cart = await get_user_cart();
	return (
		<main>
			{cart.products && cart.products.map(product => (
				<CartItem key={product.id} item={product} />
			)) || "You have no items in your cart yet."}
		</main>
	);
}
