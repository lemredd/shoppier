import get_user_cart from "@app/lib/get_user_cart";

export default async function Page(): Promise<React.ReactElement> {
	const { products } = await get_user_cart();
	return (
		<main>
			{products.map(product => (
				<li key={product.id}>{product.id}</li>
			))}
		</main>
	);
}
