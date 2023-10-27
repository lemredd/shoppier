import { infer as extract, string, object } from "zod";
import { NextRequest, NextResponse } from "next/server";

import type { Users } from "@prisma/client";
import type { EndpointResponse } from "@api/lib/types";

import { cart_operator, user_operator } from "@api/lib/operator";
import { NO_AUTH_TOKEN_PROVIDED_MESSAGE } from "@app/lib/constants";

const body_schema = object({
	"auth_token": string().optional().refine(value => Boolean(value), NO_AUTH_TOKEN_PROVIDED_MESSAGE)
});
type Body = extract<typeof body_schema>;

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const body = request.body;
	if (!body) return NextResponse.json("Not enough data.", { "status": 422 });

	const reader = body.getReader();
	const { value } = await reader.read();
	const decoded_body = JSON.parse(new TextDecoder().decode(value)) as Body;

	try {
		body_schema.parse(decoded_body);
	} catch (e) {
		return NextResponse.json(e, { "status": 422 });
	}

	let user: Users;
	try {
		user = await user_operator.findFirstOrThrow({
			"where": { "auth_token": decoded_body.auth_token }
		});
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	// TODO: handle error if `create` fails
	// TODO: consider anonymous carts
	async function create_cart(): Promise<EndpointResponse> {
		return NextResponse.json(await cart_operator.create({
			"data": { "user_id": user!.id }
		}));
	}
	const response = cart_operator.findUniqueOrThrow({
		"where": { "user_id": user!.id },
		"include": {
			"products": true
		}
	}).then(
		cart => NextResponse.json(cart)
	).catch(create_cart);
	return response;
}
