import { object, output, string } from "zod";
import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { FAKE_API_URL } from "@api/lib/constants";

const login_schema = object({
	// TODO: accept email or username, though this feature is not implemented by the fake API used in this project.
	"username": string(),
	"password": string()
});

type LoginFormEntries = output<typeof login_schema>;

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as LoginFormEntries;

	try {
		login_schema.parse(entries);
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const login_response = await fetch(`${FAKE_API_URL}/auth/login`, {
		"method": "POST",
		"headers": { "Content-Type": "application/json" },
		"body": JSON.stringify({
			...entries
			// expiresInMins: 60, // optional
		})
	})
		.then(res => res.json())
		.then(data => data as Record<string, any>);
	const is_valid_credential = Boolean(login_response.id);

	if (!is_valid_credential) return NextResponse.json(String(login_response.message), { "status": 422 });
	return NextResponse.json(login_response);
}
