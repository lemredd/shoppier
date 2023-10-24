import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { order_operator } from "@api/lib/operator";

export async function GET(request: NextRequest): Promise<EndpointResponse> {
	const auth_token = request.cookies.get("auth");
	if (!auth_token) return NextResponse.json(null, { "status": 401 });
	const data = await order_operator.findMany();
	
	return NextResponse.json(data);
}
