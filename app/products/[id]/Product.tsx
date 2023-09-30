import { Cart } from "@prisma/client";

import get_product from "@app/products/lib/get_product";

import AddToCartForm from "@app/products/[id]/components/AddToCartForm";

interface Props {
	id: number
	cart: Cart
}

// eslint-disable-next-line react-refresh/only-export-components
export const preload = (id: number): void => {
	void get_product(id);
};

export default async function ProductDetails({ id, cart }: Props): Promise<React.ReactElement> {
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
