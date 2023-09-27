import { infer as extract, object, string } from "zod";
import { NextResponse } from "next/server";

import type { Prisma } from "@prisma/client";
import type { EndpointResponse } from "@api/lib/types";

import { SERVER_URL } from "@api/lib/constants";

// Before you ask why, this is because exported types from the generated `Prisma` namespace aren't recognized.
// Tested in both Neovim and VSCode/ium. Can't figure out why it just won't recognize them.
// TODO: find a fix for this. Should just `Pick` `username, password` from `Prisma.UserCreateInput`
const register_form_entries_schema = object({
	"username": string(),
	"password": string().min(8, "Password should be at least 8 characters long."),
	"confirm_password": string().min(8, "Password should be at least 8 characters long.")
}).refine(({ password, confirm_password }) => password === confirm_password, {
	"message": "Passwords don't match.",
	"path": ["password", "confirm_password"]
});

type RegisterFormEntries = extract<typeof register_form_entries_schema>

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as RegisterFormEntries;

	try {
		register_form_entries_schema.parse(entries);
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const { "users": found_user } = await fetch(`${SERVER_URL}/users/search?q=${String(username)}`)
		.then(res => res.json())
		.then(data => data as Record<string, any>);
	if (found_user.length) return NextResponse.json("User exists.", { "status": 422 });
	
	// TODO: Login after successful register
	const register_response = await fetch(`${SERVER_URL}/users/add`, {
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
