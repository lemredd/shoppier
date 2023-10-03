"use client";

import { CartProduct } from "@prisma/client";

interface Props {
	item: CartProduct
}

export default function CartItem({ item }: Props): React.ReactElement {
	return (
		<li>{item.id}</li>
	);
}

