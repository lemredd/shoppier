import { NextResponse } from "next/server";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<ReturnType<typeof NextResponse["json"]> | Response> {
	const data = await request.formData();
	const username = data.get("username"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)
	const password = data.get("password"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)

	const login_response = 
		fetch(`${API_URL}/auth/login`, {
			"method": "POST",
			"headers": { "Content-Type": "application/json" },
			"body": JSON.stringify({
				username,
				password,
				// expiresInMins: 60, // optional
			})
		})
			.then(res => res.json()) as Record<string, any>;
	const is_valid_credential = Boolean(login_response.id);

	if (!is_valid_credential) return NextResponse.json({ "status": 422, "message": String(login_response.message) });
	return NextResponse.json(Object.fromEntries(data));
}
