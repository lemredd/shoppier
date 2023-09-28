import { NextResponse } from "next/server";
import { infer as extract, object, null as null_checker, string } from "zod";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

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

const existing_user_checker = null_checker({ "invalid_type_error": "This user already exists." });

type RegisterFormEntries = extract<typeof register_form_entries_schema>

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as RegisterFormEntries;

	try {
		register_form_entries_schema.parse(entries);
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	// TODO: validate with Zod
	// TODO: maybe return `409`
	const response = user_operator.findUnique({
		"where": { "username": entries.username }
	}).then(
		user => existing_user_checker.parse(user)
	).catch(
		e => NextResponse.json(e, { "status": 409 })
	);
	
	// TODO: Login after successful register
	//const register_response = await fetch(`${SERVER_URL}/users/add`, {
	//	"method": "POST",
	//	"headers": { "Content-Type": "application/json" },
	//	"body": JSON.stringify({
	//		username,
	//		password,
	//		// expiresInMins: 60, // optional
	//	})
	//})
	//	.then(res => res.json())
	//	.then(data => data as Record<string, any>);
	return response;
}
