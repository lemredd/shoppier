"use client";

import { FormEvent } from "react";

export default function Page(): React.ReactNode {
	function submit(event: FormEvent): void {
		event.preventDefault();

		const form_data = new FormData(event.target as HTMLFormElement);
		fetch("/api/login", {
			"method": "POST",
			"headers": {
				"content-type": "application/json"
			},
			"body": JSON.stringify({
				"username": form_data.get("username")
			})
		}).catch(console.error);
	}

	return (
		<form onSubmit={submit}>
			<input type="text" name="username" />
		</form>
	);
}
