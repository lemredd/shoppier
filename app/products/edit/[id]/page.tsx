"use client";

import { FormEvent, useEffect, useState } from "react";

import type { Product } from "@/app/lib/types";

import get_product from "@app/products/lib/get_product";

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
	function submit(event: FormEvent): void {
		event.preventDefault();

		function handle_data(data: Product): void {
			if (data.status === 422) return console.error(data.message); // TODO: show error on UI
			console.log(data);
		}

		const form_data = new FormData(event.target as HTMLFormElement);
		fetch(`/api/products/${id}`, {
			"method": "PATCH",
			"body": form_data
		})
			.then(response => response.json())
			.then(handle_data)
			.catch(console.error);
	}

	const [is_deleting, set_is_deleting] = useState<boolean>(false);
	function delete_product(): void {
		fetch(`/api/products/${id}`, { "method": "DELETE" })
			.then(() => set_is_deleting(false))
			.catch(console.error);
	}

	// TODO: suspense form!
	return (
		<>
			<form onSubmit={submit} method="PATCH" style={{ "display": "flex", "flex-direction": "column", "gap": "1em" }}>
				{/* TODO: use atomic CSS Library */}
				<label htmlFor="title">
					title
					<input type="text" id="title" name="title" defaultValue={product?.title} />
				</label>
				<label htmlFor="brand">
					brand
					<input type="text" id="brand" name="brand" defaultValue={product?.brand} />
				</label>
				<label htmlFor="price">
					price
					<input type="text" id="price" name="price" defaultValue={product?.price} />
				</label>
				<label htmlFor="stock">
					stock
					<input type="text" id="stock" name="stock" defaultValue={product?.stock} />
				</label>
				<label htmlFor="description">
					description
					<input type="text" id="description" name="description" defaultValue={product?.description} />
				</label>
				<input type="submit" value="Submit" />
			</form>
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
