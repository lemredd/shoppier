import encryptor from "bcrypt";
import { NextResponse } from "next/server";
import { infer as extract, object, string } from "zod";

import { Users } from "@prisma/client";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

const { PASSWORD_SALT_ROUNDS, AUTH_TOKEN_SALT_ROUNDS } = process.env;

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
	let new_user: Omit<Users, "password"> & Partial<{ password: string }>;
	const auth_token = await encryptor.hash(`${entries.email}_${Date.now()}`, Number(AUTH_TOKEN_SALT_ROUNDS));
	const auth_token_creation = { "create": { "value": auth_token } };
	const response = await user_operator.create({
		"data": {
			"email": entries.email,
			"password": await encryptor.hash(entries.password, Number(PASSWORD_SALT_ROUNDS)),
			"auth_tokens": auth_token_creation
		}
	}).then(user => {
		new_user = user;
		delete new_user.password;
		return NextResponse.json(new_user);
	}).catch(
		e => NextResponse.json(e, { "status": 409 }) // TODO: Unify errors thrown by `Zod` and `Prisma`
	);

	if (response.ok) {
		response.cookies.set({
			"name": "auth",
			"value": auth_token,
			"httpOnly": true,
			"sameSite": "strict",
			"maxAge": 60 * 60 * 24 * 30 // TODO: change duration (currently 1 month)
		});
	}
	return response;
}
