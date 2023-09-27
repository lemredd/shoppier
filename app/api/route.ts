import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { user_operator } from "@api/lib/operator";

export async function GET(request: NextRequest): Promise<EndpointResponse> {
	const { skip, limit } = Object.fromEntries(request.nextUrl.searchParams);
	const data = await user_operator.findMany({
		"skip": 0,
		"take": 3
	});
	return NextResponse.json(data);
}
