"use client";

import { FormEvent } from "react";

export default function Page(): React.ReactNode {
	function submit(event: FormEvent): void {
		event.preventDefault();

		function handle_data(data: Record<string, any>): void {
			localStorage.setItem("user", JSON.stringify(data)); // TODO: `router.push` to home
		}

		const form_data = new FormData(event.target as HTMLFormElement);
		fetch("/api/register", {
			"method": "POST",
			"body": form_data
		})
			.then(response => response.json())
			.then(handle_data)
			.catch(console.error); // TODO: show error on UI
	}

	return (
		<form onSubmit={submit} method="POST">
			<input type="text" name="username" />
			<input type="password" name="password" />
			<input type="submit" value="Submit" />
		</form>
	);
}
