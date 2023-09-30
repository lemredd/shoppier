import get_user_cart from "@/app/lib/get_user_cart";

import Product from "./Product";

interface PageProps {
	params: Record<"id", number>
}

export default async function Page({ params }: PageProps): Promise<React.ReactElement> {
	const { id } = params;
	const cart = await get_user_cart();
	
	return (
		<>
			<Product id={id} cart={cart} />
		</>
	);
}
