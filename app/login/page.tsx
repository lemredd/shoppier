"use client";

import { FormEvent } from "react";

export default function Page(): React.ReactNode {
	function submit(event: FormEvent): void {
		event.preventDefault();

		const form_data = new FormData(event.target as HTMLFormElement);
		fetch("/api/login", {
			"method": "POST",
			"body": form_data
		}).catch(console.error);
	}

	return (
		<form onSubmit={submit} method="POST">
			<input type="text" name="username" />
			<input type="password" name="password" />
			<input type="submit" value="Submit" />
		</form>
	);
}
