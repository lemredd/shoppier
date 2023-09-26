"use client";

import { FormEvent } from "react";

import type { Product } from "@/app/lib/types";

export default function Page(): React.ReactNode {
	function submit(event: FormEvent): void {
		event.preventDefault();

		function handle_data(data: Product): void {
			if (data.status === 422) return console.error(data.message); // TODO: show error on UI
			console.log(data);
		}

		const form_data = new FormData(event.target as HTMLFormElement);
		fetch("/api/products", {
			"method": "POST",
			"body": form_data
		})
			.then(response => response.json())
			.then(handle_data)
			.catch(console.error);
	}

	return (
		<form onSubmit={submit} method="POST" style={{ "display": "flex", "flex-direction": "column", "gap": "1em" }}>
			{/* TODO: use atomic CSS Library */}
			<label htmlFor="title">title<input type="text" id="title" name="title" /></label>
			<label htmlFor="brand">brand<input type="text" id="brand" name="brand" /></label>
			<label htmlFor="price">price<input type="text" id="price" name="price" /></label>
			<label htmlFor="stock">stock<input type="text" id="stock" name="stock" /></label>
			<label htmlFor="description">description<input type="text" id="description" name="description" /></label>
			<input type="submit" value="Submit" />
		</form>
	);
}

