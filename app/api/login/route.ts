import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<EndpointResponse> {
	const data = await request.formData();
	const username = data.get("username"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)
	const password = data.get("password"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)

	const login_response = await fetch(`${API_URL}/auth/login`, {
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
	const is_valid_credential = Boolean(login_response.id);

	if (!is_valid_credential) return NextResponse.json({ "status": 422, "message": String(login_response.message) });
	return NextResponse.json(login_response);
}
