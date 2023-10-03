import get_user_cart from "@app/lib/get_user_cart";
import CartItem from "./CartItem";

export default async function Page(): Promise<React.ReactElement> {
	const { products } = await get_user_cart();
	return (
		<main>
			{products.map(product => (
				<CartItem key={product.id} item={product} />
			))}
		</main>
	);
}
