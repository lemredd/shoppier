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
		<form onSubmit={submit} method="POST">
			<input type="text" name="username" />
			<input type="password" name="password" />
			<input type="submit" value="Submit" />
		</form>
	);
}

