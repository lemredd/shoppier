import { infer as extract, object, string } from "zod";
import { NextResponse } from "next/server";

import type { Prisma } from "@prisma/client";
import type { EndpointResponse } from "@api/lib/types";

import { SERVER_URL } from "@api/lib/constants";

// Before you ask why, this is because exported types from the generated `Prisma` namespace aren't recognized.
// Tested in both Neovim and VSCode/ium. Can't figure out why it just won't recognize them.
// TODO: find a fix for this. Should just `Omit` `username, password` from `Prisma.UserCreateInput`
const register_form_entries_schema = object({
	"username": string(),
	"password": string(),
	"confirm_password": string()
});

type RegisterFormEntries = extract<typeof register_form_entries_schema>

export async function POST(request: Request): Promise<EndpointResponse> {
	const data = await request.formData();
	const username = data.get("username"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)
	const password = data.get("password"); // TODO: validate manually or with 3rd party validator (i.e. Zod, Valibot)

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
