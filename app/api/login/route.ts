import { object, output, string } from "zod";
import { NextResponse } from "next/server";

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

	const unique_finder = entries.username_or_email.includes("@")
		? { "email": entries.username_or_email }
		: { "username": entries.username_or_email };
	const response = user_operator.findUniqueOrThrow({ "where": unique_finder })
		// TODO: use `NextResponse.next` to set cookie
		.then(user => NextResponse.json(user, { "headers": { "Set-Cookie": `user=${user.id}` } })) // TODO: hide password
		.catch(e => NextResponse.json(e, { "status": 422 })); // TODO: make error message generator

	return response;
}
