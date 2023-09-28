import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { cart_operator } from "@api/lib/operator";

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const body = request.body;
	if (!body) return NextResponse.json("Not enough data.", { "status": 422 });

	const reader = body.getReader();
	const { value } = await reader.read();
	const decoded_body = JSON.parse(new TextDecoder().decode(value)) as Record<string, any>;

	const response = cart_operator.findUnique({ "where": { "user_id": decoded_body.user_id } })
		.then(cart =>  NextResponse.json(cart))
		.catch(e => NextResponse.json(e, { "status": 422 }));
	return response;
}
