import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

export async function GET(request: Request): Promise<EndpointResponse> {
	const url = new URL(request.url);
	console.log(url);

	//const response = await fetch(`${API_URL}/auth/login`, {
	//	"method": "POST",
	//	"headers": { "Content-Type": "application/json" },
	//	"body": JSON.stringify({
	//		username,
	//		password,
	//		// expiresInMins: 60, // optional
	//	})
	//})
	//	.then(res => res.json())
	//	.then(data => data as Record<string, any>);
	//const is_valid_credential = Boolean(login_response.id);

	//if (!is_valid_credential) return NextResponse.json({ "status": 422, "message": String(login_response.message) });
	return NextResponse.json({});
}
