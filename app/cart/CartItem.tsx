"use client";

import { useState } from "react";

import type { CartProduct } from "@prisma/client";

interface Props {
	item: CartProduct
}

export default function CartItem({ item }: Props): React.ReactElement {
	const [is_editing, set_is_editing] = useState(false);

	return (
		<li>
			<h1>{item.id}</h1>
			
		</li>
	);
}

