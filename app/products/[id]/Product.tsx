"use client";

import { useState } from "react";

import type { Product } from "@/app/lib/types";

interface Props {
	id: number
}

export default function Product({ id }: Props): React.ReactNode {
	const [product, set_product] = useState<Product>();
	return (
		<>
		</>
	);
}
