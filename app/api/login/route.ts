import { NextResponse } from "next/server";
import { object, output, string } from "zod";

import type { User } from "@prisma/client";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

const login_schema = object({
	// TODO: accept email or username
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

	let found_user: User;
	let unique_finder = entries.username_or_email.includes("@")
		? { "email": entries.username_or_email }
		: { "username": entries.username_or_email };
	let response = await user_operator.findUniqueOrThrow({ "where": unique_finder })
		.then(user => {
			found_user = user;
			unique_finder = { "email": user.email };
			return NextResponse.json(user);
		}) // TODO: hide password
		.catch(e => NextResponse.json(e, { "status": 422 })); // TODO: make error message generator

	if (response.ok) {
		const auth_token = `${found_user!.email}_${Date.now()}`;
		await user_operator.update({
			"where": unique_finder,
			"data": { auth_token }
		}).catch(e => response = NextResponse.json(e, { "status": 500 }));
		response.cookies.set({
			"name": "auth",
			"value": String(found_user!.id), // TODO: make and use `auth_token` field from user model, which is regenerated for every login
			"httpOnly": true,
			"sameSite": "strict",
			"maxAge": 60 * 60 * 24 * 30 // TODO: change duration (currently 1 month)
		});
	}
	return response;
}
