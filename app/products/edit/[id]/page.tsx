"use client";

import { useEffect, useState } from "react";

import type { Product } from "@/app/lib/types";

import get_product from "@app/products/lib/get_product";

import ProductForm from "@app/products/components/ProductForm";

interface PageProps {
	params: Record<"id", number>
}

export default function Page({ params }: PageProps): React.ReactNode {
	const { id } = params;

	const [product, set_product] = useState<Product>();
	useEffect(() => {
		get_product(id)
			.then(set_product)
			.catch(console.error);
	}, [id]);
	

	const [is_deleting, set_is_deleting] = useState<boolean>(false);
	function delete_product(): void {
		fetch(`/api/products/${id}`, { "method": "DELETE" })
			.then(() => set_is_deleting(false))
			.catch(console.error);
	}

	return (
		<>
			<ProductForm method="PATCH" product={product} />
			<button type="button" onClick={(): void => set_is_deleting(true)}>
				Delete
			</button>
			{is_deleting && (
				<dialog open={is_deleting}>
					Are you sure?
					<button type="button" onClick={delete_product}>Yes</button>
					<button type="button" onClick={(): void => set_is_deleting(false)}>no</button>
				</dialog>
			)}
		</>
	);
}
