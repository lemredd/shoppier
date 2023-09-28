"use client";

import { FormEvent } from "react";

import type { Product } from "@/app/lib/types";

interface Props {
	product?: Product
	method: "POST" | "PATCH"
}

export default function ProductForm({ product, method }: Props): React.ReactElement {
	function submit(event: FormEvent): void {
		event.preventDefault();
		const form_data = new FormData(event.target as HTMLFormElement);

		function handle_data(data: Product): void {
			console.log(data);
		}
		fetch(`/api/products${method === "PATCH" ? `/${product?.id}` : ""}`, {
			method,
			"body": form_data
		})
			.then(response => response.json())
			.then(handle_data)
			.catch(console.error); // TODO: show error on UI
	}

	// TODO: suspense form!
	return (
		<form onSubmit={submit} method={method} style={{ "display": "flex", "flexDirection": "column", "gap": "1em" }}>
			{/*
				TODO: use atomic CSS Library
				TODO: Add `images` and `thumbnail` fields
			*/}
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
				<input type="text" inputMode="numeric" pattern="\d*" id="price" name="price" defaultValue={product?.price} />
			</label>
			<label htmlFor="stock">
				stock
				<input type="text" inputMode="numeric" pattern="\d*" id="stock" name="stock" defaultValue={product?.stock} />
			</label>
			<label htmlFor="description">
				description
				<input type="text" id="description" name="description" defaultValue={product?.description} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
}
