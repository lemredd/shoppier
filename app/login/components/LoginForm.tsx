"use client";

import { useRouter } from "next/navigation";

import type { FormEvent } from "react";

// TODO: redirect to homepage if `auth` cookie is set
export default function LoginForm(): React.ReactElement {
	const router = useRouter();
	function submit(event: FormEvent): void {
		event.preventDefault();

		function handle_response(response: Response): void {
			if (response.ok) return router.push("/");
			console.error(response.body); // TODO: show error on UI
		}
		const form_data = new FormData(event.target as HTMLFormElement);
		fetch("/api/login", {
			"method": "POST",
			"body": form_data
		})
			.then(handle_response)
			.catch(console.error);
	}

	return (
		<form onSubmit={submit} method="POST">
			<input type="text" name="username_or_email" />
			<input type="password" name="password" />
			<input type="submit" value="Submit" />
		</form>
	);
}
