import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { cart_operator } from "@api/lib/operator";

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const body = request.body;
	if (!body) return NextResponse.json("Not enough data.", { "status": 422 });

	const reader = body.getReader();
	const { value } = await reader.read();
	const decoded_body = JSON.parse(new TextDecoder().decode(value)) as Record<string, any>; // TODO: validate with schema

	// TODO: handle error if `create` fails
	// TODO: consider anonymous carts
	async function create_cart(): Promise<EndpointResponse> {
		return NextResponse.json(await cart_operator.create({ "data": {
			"user_id": decoded_body.user_id,
		} }));
	}
	const response = cart_operator.findUniqueOrThrow({ "where": { "user_id": decoded_body.user_id } })
		.then(cart =>  NextResponse.json(cart))
		.catch(create_cart);
	return response;
}
