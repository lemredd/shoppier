import { NextResponse } from "next/server";
import { infer as extract, object, string } from "zod";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

// Before you ask why, this is because exported types from the generated `Prisma` namespace aren't recognized.
// Tested in both Neovim and VSCode/ium. Can't figure out why it just won't recognize them.
// TODO: find a fix for this. Should just `Pick` `username, password` from `Prisma.UserCreateInput`
const register_form_entries_schema = object({
	"email": string().email(),
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

	// TODO: Login after successful register
	const response = user_operator.create({
		"data": {
			"email": entries.email,
			"username": entries.email.split("@")[0],
			"password": entries.password
		}
	}).then(
		user => NextResponse.json(user) // TODO: hide password
	).catch(
		e => NextResponse.json(e, { "status": 409 }) // TODO: Unify errors thrown by `Zod` and `Prisma`
	);
	return response;
}
