import { NextResponse } from "next/server";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<ReturnType<typeof NextResponse["json"]> | Response> {
	const data = await request.formData();
	const username = data.get("username"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)
	const password = data.get("password"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)

	const found_user = await fetch(`${API_URL}/users?q=${String(username)}`)
		.then(res => res.json())
		.then(data => data as Record<string, any>);
	if (found_user.length) return NextResponse.json({ "status": 400, "message": "User exists." });
	
	// TODO: Login after successful register
	const register_response = await fetch(`${API_URL}/users/add`, {
		"method": "POST",
		"headers": { "Content-Type": "application/json" },
		"body": JSON.stringify({
			username,
			password,
			// expiresInMins: 60, // optional
		})
	})
		.then(res => res.json())
		.then(data => data as Record<string, any>);
	return NextResponse.json(register_response);
}
