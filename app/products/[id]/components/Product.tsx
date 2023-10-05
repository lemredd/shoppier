import type { UserCart } from "@/app/lib/get_user_cart";

import get_product from "@app/products/lib/get_product";

import AddToCartForm from "@app/products/[id]/components/AddToCartForm";

interface Props {
	id: number
	cart: UserCart
}

// eslint-disable-next-line react-refresh/only-export-components
export const preload = (id: number): void => {
	void get_product(id);
};

export default async function ProductDetails({ id, cart }: Props): Promise<React.ReactElement> {
	const data = await get_product(id);
	return (
		<>
			{/*
			* TODO: wrap with semantic HTML
			* TODO: Display the rest of product details
			*/}
			{data.title}
			<AddToCartForm {...{ id, cart }} />
		</>
	);
}
