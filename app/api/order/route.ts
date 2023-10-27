import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { auth_token_operator, order_operator } from "@api/lib/operator";

export async function GET(request: NextRequest): Promise<EndpointResponse> {
	const auth_token = request.cookies.get("auth");
	if (!auth_token) return NextResponse.json(null, { "status": 401 });

	const found_user_or_error = await auth_token_operator.findUniqueOrThrow({
		"where": { "value": auth_token.value },
		"include": { "user": true }
	}).then(
		token => token.user
	).catch(
		(error: Error) => error
	);

	if (found_user_or_error instanceof Error) return NextResponse.json(
		found_user_or_error,
		{ "status": 401 }
	);

	const response = order_operator.findMany({
		"where": { "user_id": found_user_or_error.id }
	}).then(orders => NextResponse.json(orders));

	return response;
}
export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const auth_token = request.cookies.get("auth");
	if (!auth_token) return NextResponse.json(null, { "status": 401 });
	const auth_token_inclusions = { "user": {
		"include": { "cart": {
			"include": { "products": true }
		} }
	} };
	const found_user_or_error = await auth_token_operator.findUniqueOrThrow({
		"where": { "value": auth_token.value },
		"include": auth_token_inclusions
	}).then(
		token => token.user
	).catch(
		(error: Error) => error
	);
	if (found_user_or_error instanceof Error) return NextResponse.json(
		found_user_or_error,
		{ "status": 401 }
	);
}
