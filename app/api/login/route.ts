import encryptor from "bcrypt";
import { NextResponse } from "next/server";
import { object, output, string } from "zod";

import type { Users } from "@prisma/client";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator, auth_token_operator } from "@api/lib/operator";

const { AUTH_TOKEN_SALT_ROUNDS } = process.env;

const login_schema = object({
	"username_or_email": string().or(string().email()),
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

	let found_user: Omit<Users, "password"> & Partial<{ password: string }>;
	async function validate_password(found: string): Promise<boolean> {
		return await encryptor.compare(entries.password, found);
	}
	let unique_finder = entries.username_or_email.includes("@")
		? { "email": entries.username_or_email }
		: { "username": entries.username_or_email };
	let response = await user_operator.findUniqueOrThrow({
		"where": unique_finder
	}).then(async user => {
		if (!await validate_password(user.password)) return NextResponse.json(
			"Invalid Credentials",
			{ "status": 422 }
		);

		found_user = user;
		delete found_user.password;
		unique_finder = { "email": user.email };

		return NextResponse.json(found_user);
	}).catch(
		e => NextResponse.json(e, { "status": 422 })
	); // TODO: make error message generator

	if (response.ok) {
		const auth_token = await encryptor.hash(
			`${found_user!.email}_${Date.now()}`,
			Number(AUTH_TOKEN_SALT_ROUNDS)
		);
		const found_user_connector = {
			"connect": { "id": found_user!.id }
		};
		await auth_token_operator.create({ "data": {
			"value": auth_token,
			"user": found_user_connector
		} }).then(() => response.cookies.set({
			"name": "auth",
			"value": auth_token,
			"httpOnly": true,
			"sameSite": "strict",
			"maxAge": 60 * 60 * 24 * 30 // TODO: change duration (currently 1 month)
		})).catch(
			e => response = NextResponse.json(e, { "status": 500 })
		);
		
	}
	return response;
}
