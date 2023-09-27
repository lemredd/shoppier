import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

export async function GET(): Promise<EndpointResponse> {
	const data = await user_operator.findMany({
		"skip": 0,
		"take": 3
	});
	return NextResponse.json(data);
}
